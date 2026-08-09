const STYLE_KEYS = ['en', 'hi', 'gu', 'hg'];

const hits = new Map();
function rateAllowed(ip, max, windowMs) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > windowMs) {
    hits.set(ip, { t: now, n: 1 });
    if (hits.size > 10000) hits.clear();
    return true;
  }
  h.n++;
  if (h.n > max) return false;
  return true;
}

function originAllowed(req) {
  const origin = (req.headers.origin || '').toLowerCase();
  if (!origin) return true;
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  const host = (process.env.VERCEL_URL || '').toLowerCase();
  if (host && origin.indexOf(host) !== -1) return true;
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  return allowed.indexOf(origin) !== -1;
}

function setCors(req, res) {
  const origin = req.headers.origin || '';
  if (origin && originAllowed(req)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(req, res);
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, code: 'method_not_allowed' });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ ok: false, code: 'origin_forbidden' });
    return;
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  if (!rateAllowed(ip, 8, 60000)) {
    res.status(429).json({ ok: false, code: 'rate_limited' });
    return;
  }
  let input;
  try {
    input = JSON.parse(req.body || '{}');
  } catch (e) {
    res.status(400).json({ ok: false, code: 'bad_request' });
    return;
  }
  if (!process.env.OPENAI_API_KEY) {
    res.status(200).json({ ok: false, code: 'no_key' });
    return;
  }
  const clean = s => String(s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  const business = clean(input.business || 'the restaurant').slice(0, 80);
  const location = clean(input.location || '').slice(0, 80);
  const rating = Math.max(1, Math.min(5, parseInt(input.rating, 10) || 5));
  const langs = Array.isArray(input.languages) && input.languages.length
    ? input.languages.map(t => String(t).slice(0, 8)).filter(l => STYLE_KEYS.indexOf(l) !== -1).slice(0, 4)
    : null;
  const previous = Array.isArray(input.previousReviews) ? input.previousReviews.slice(0, 25).map(t => String(t).slice(0, 600)) : [];
  const count = langs ? langs.length : Math.max(3, Math.min(5, parseInt(input.count, 10) || 5));

  const styleMap = {
    en: 'Natural conversational English, casual but grammatically normal.',
    hi: 'Romanized Hindi written with English letters only. Example: "Khane ka taste bahut accha tha aur service bhi kaafi fast thi." Never use Devanagari.',
    gu: 'Romanized Gujarati written with English letters only. Example: "Jamvanu taste ekdum mast hatu ane service pan sari hati." Never use Gujarati script.',
    hg: 'Natural conversational Indian Hinglish, a casual mix of Hindi and English. Example: "Food ka taste mast tha aur ambience bhi kaafi nice tha."'
  };

  const langInstruction = langs
    ? 'Write exactly ' + langs.length + ' reviews in this fixed order, numbered 1 to ' + langs.length + '. '
      + langs.map((l, i) => (i + 1) + '. ' + styleMap[l]).join(' ')
      + ' Each review must be written in its listed language style, never in any other language.'
    : styleMap[String(input.language || 'en').slice(0, 8)] || styleMap.en;

  const system = 'You write short, professional but natural, human-sounding Google reviews for a restaurant. '
    + 'The customer may be happy OR unhappy - match the rating honestly. '
    + 'Never sound like AI marketing copy. Do not use these words unless they naturally fit: exceptional, outstanding, unforgettable, must-visit, amazing. '
    + 'Never repeat a previous review and never reuse the opening words of any previous review. '
    + 'Every one of the ' + count + ' reviews must have a different opening and different sentence structure. '
    + 'Keep each review 1 to 4 sentences, conversational, with at most one emoji and only when it feels natural (no emojis for negative reviews). '
    + langInstruction
    + ' Reply with ONLY a JSON array of exactly ' + count + ' objects, each with one key "text": [{"text": "..."}]';

  const user = 'Restaurant name: "' + business + '". Location: "' + location + '". '
    + 'Rating given by the customer: ' + rating + '/5.'
    + (previous.length ? ' Previous reviews already shown to this customer (never repeat them or their openings): ' + JSON.stringify(previous) : '');

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        max_tokens: 1000,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      })
    });
    clearTimeout(timer);
    if (!r.ok) {
      res.status(502).json({ ok: false, code: 'ai_error' });
      return;
    }
    const data = await r.json();
    let content = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content : '';
    content = content.replace(/```json|```/g, '').trim();
    const arr = JSON.parse(content);
    let reviews = Array.isArray(arr)
      ? arr.map(x => (typeof x === 'string' ? x : x && x.text))
          .filter(x => typeof x === 'string' && x.trim().length >= 10)
          .slice(0, count)
          .map(x => x.trim())
      : [];
    if (reviews.length < 3) {
      res.status(502).json({ ok: false, code: 'ai_bad_output' });
      return;
    }
    res.status(200).json({ ok: true, reviews: reviews.slice(0, count) });
  } catch (e) {
    res.status(502).json({ ok: false, code: 'ai_error' });
  }
}
