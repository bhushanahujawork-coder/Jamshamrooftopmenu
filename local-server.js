const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const PORT = process.env.PORT || 3006;
const CERT_PFX = process.env.CERT_PFX || path.join(root, 'cert.pfx');
const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE || 'jsrpass';
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || 'jsrowner';
const pfx = fs.readFileSync(CERT_PFX);

const DATA_DIR = path.join(root, 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

function loadJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}
function saveJSON(file, data) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {}
}

const SEED_REVIEWS = [
  { biz: 'jamshamCafe', rating: 5, language: 'en', text: 'Was in Jamnagar for the weekend and a friend forced us to try JamSham Cafe at night. Honestly, the place was packed even at midnight — that says everything. The Masala Chai and Pink Sauce Pasta were both spot on. Best late night spot in town, hands down. 😊' },
  { biz: 'jamshamCafe', rating: 5, language: 'hg', text: 'Raat ko 11 baje bhook lagi thi aur JamSham ekdum perfect nikla. Mocha Cold Coffee mast thi aur staff bhi kaafi friendly tha. Jabardast experience, pakka wapas aaunga. 🔥' },
  { biz: 'jamshamCafe', rating: 5, language: 'en', text: 'Finally a cafe in Jamnagar that stays open late and actually serves good food. The Sizzling Brownie was the highlight of the night — hot brownie with cold ice cream, no complaints at all. ⭐' },
  { biz: 'jamshamCafe', rating: 4, language: 'hg', text: 'Dost ke saath evening bitai yahan, Blue Lagoon aur Crispy Cheesy Fries try kiye. Sab theek tha, bas thoda busy tha isliye thodi wait lagi. Overall accha experience. 👍' },
  { biz: 'jamshamCafe', rating: 5, language: 'en', text: 'Their cold coffee is honestly better than most places in the city. We came back the next night just for it. Great ambience, nice music, and the staff remembered us. ☕' },
  { biz: 'jamshamCafe', rating: 5, language: 'hg', text: 'Kurkure Momos aur Nutella Shake — dono top class. Bheed hote hue bhi service fast thi. Jamnagar me late night hangout ka best option. 😊' },
  { biz: 'jamshamCafe', rating: 4, language: 'en', text: 'Visited with family late at night. The Pani Puri Shots were fun, and the Veggie Cheesy Sub was good. Music was a bit loud for us, but the food made up for it. 🙂' },
  { biz: 'jamshamCafe', rating: 3, language: 'hg', text: 'Masala Chai acchi thi par service thodi slow rahi kyunki bahut rush tha. Khana theek tha, kuch zyada khaas nahi. 🙂' },
  { biz: 'jamshamCafe', rating: 5, language: 'en', text: 'Came here at 2 am after a long drive and was surprised how fresh everything tasted. The Tandoori Paneer Maggi fixed my night. This cafe is a gem. 🔥' },
  { biz: 'jamshamCafe', rating: 5, language: 'hg', text: 'Jam Sham Spl. Chai try ki aur wahi se ho gaya. Hazelnut Cold Coffee bhi mast thi. Bahut polite staff, highly recommended. ⭐' },
  { biz: 'jamshamRooftop', rating: 5, language: 'en', text: 'Rooftop seating under the open sky, cool breeze, and decent music — the whole vibe was perfect. We ordered the Mexican Chipotle Pizza and it was loaded with cheese. One of my favourite evenings this month. 🌙' },
  { biz: 'jamshamRooftop', rating: 5, language: 'hg', text: 'Rooftop pe baith ke shaam bitana — maza aa gaya. Strawberry Shake thick thi aur Harabhara Kabab bhi accha tha. Staff ne ekdum accha treat kiya. Pakka dobara aayenge. 😊' },
  { biz: 'jamshamRooftop', rating: 4, language: 'en', text: 'Nice rooftop place, the ambience is the real selling point. Farmhouse Pizza was good, though the drinks took a while to arrive. Would come back on a less crowded night. 🙂' },
  { biz: 'jamshamRooftop', rating: 5, language: 'hg', text: 'Dosto ke saath plan bana ke aaye the, rooftop ka vibe hi alag hai. Chocolate Shake aur Pink Sauce Pasta — dono ekdum zabardast. Raat bhar baithne ka mann kar raha tha. 🔥' },
  { biz: 'jamshamRooftop', rating: 5, language: 'en', text: 'Came for a birthday celebration and they made it special. The music was at the perfect volume, the rooftop view was beautiful, and the Sizzling Brownie ended the night perfectly. ⭐' },
  { biz: 'jamshamRooftop', rating: 4, language: 'hg', text: 'Rooftop ka view sahi hai aur food bhi accha. Nutella Toast try kiya, wo bhi accha tha. Thoda crowded tha par overall accha. 👍' },
  { biz: 'jamshamRooftop', rating: 5, language: 'en', text: 'This is the best rooftop spot in Jamnagar right now. Tandoori Paneer Pizza is a must try. Service was quick even though every table was full. Keep it up! 🌙' },
  { biz: 'jamshamRooftop', rating: 5, language: 'hg', text: 'Kal raat girlfriend ke saath gaya tha, ambience itna accha tha ki waqt pata hi nahi chala. Mint Mojito aur Crispy Cheesy Fries — perfect combination. ☕' },
  { biz: 'jamshamRooftop', rating: 3, language: 'en', text: 'The rooftop concept is nice, but it got too crowded and we waited long for our order. The food was decent though. Hope they manage the rush better. 🙂' },
  { biz: 'jamshamRooftop', rating: 5, language: 'hg', text: 'Weekend pe family ke saath aaye, sabko maza aaya. Oreo Shake aur Pani Puri Shots best rahe. Raat ka view top class. Jamnagar waalon ke liye must visit. 😊' }
];

function getReviews() {
  var all = loadJSON(REVIEWS_FILE, null);
  if (!all || !Array.isArray(all.reviews)) {
    all = { seeded: true, reviews: SEED_REVIEWS.map(function (r, i) {
      return { id: 'seed-' + (i + 1), biz: r.biz, rating: r.rating, language: r.language, text: r.text, addedAt: Date.now() };
    }) };
    saveJSON(REVIEWS_FILE, all);
  }
  return all.reviews;
}
function saveReviews(list) { saveJSON(REVIEWS_FILE, { seeded: true, reviews: list }); }
function getAnalytics() {
  var a = loadJSON(ANALYTICS_FILE, null);
  return a && Array.isArray(a.events) ? a.events : [];
}
function saveAnalytics(events) { saveJSON(ANALYTICS_FILE, { events: events.slice(-20000) }); }

const ownerTokens = new Map();
function ownerTokenFor(req) {
  var h = (req.headers['authorization'] || '');
  var q = (req.url.split('?')[1] || '').split('&');
  for (var i = 0; i < q.length; i++) {
    var kv = q[i].split('=');
    if (kv[0] === 'token') h = 'Bearer ' + decodeURIComponent(kv[1]);
  }
  var tok = h.replace(/^Bearer\s+/i, '').trim();
  if (!tok || !ownerTokens.has(tok)) return false;
  if (Date.now() - ownerTokens.get(tok) > 12 * 3600000) { ownerTokens.delete(tok); return false; }
  return true;
}
function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

function readBody(req, cb) {
  let body = '';
  req.on('data', c => { body += c; if (body.length > 200000) { req.destroy(); return; } });
  req.on('end', () => cb(body));
  req.on('error', () => cb(''));
}

const hits = new Map();
function rateAllowed(key, max, windowMs) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || now - h.t > windowMs) {
    hits.set(key, { t: now, n: 1 });
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

function callOpenAI(payload, cb) {
  const data = JSON.stringify(payload);
  const req = https.request({
    host: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Length': Buffer.byteLength(data)
    }
  }, r => {
    let out = '';
    r.on('data', c => { out += c; });
    r.on('end', () => cb(r.statusCode, out));
  });
  req.on('error', () => cb(502, ''));
  req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  req.write(data);
  req.end();
}

function handlePost(req, res) {
  const url = req.url.split('?')[0];
  const origin = req.headers.origin || '';
  if (origin && !originAllowed(req)) {
    res.writeHead(403);
    res.end('403');
    return;
  }
  setCors(req, res);
  const ip = req.socket.remoteAddress || 'unknown';
  readBody(req, body => {
    if (url === '/api/analytics') {
      if (!rateAllowed('an:' + ip, 60, 60000)) {
        res.writeHead(429); res.end(); return;
      }
      let events;
      try {
        const parsed = JSON.parse(body);
        events = Array.isArray(parsed.events) ? parsed.events : [parsed];
      } catch (e) { events = null; }
      if (events) {
        const now = Date.now();
        const clean = events.map(e => ({
          n: String(e.n || 'unknown').slice(0, 40),
          d: (e.d && typeof e.d === 'object') ? e.d : {},
          t: e.t || now,
          u: String(e.u || '').slice(0, 80)
        }));
        saveAnalytics(getAnalytics().concat(clean));
      }
      res.writeHead(204); res.end();
      return;
    }
    if (url === '/api/owner/login') {
      if (!rateAllowed('ol:' + ip, 10, 60000)) { res.writeHead(429); res.end(); return; }
      let input;
      try { input = JSON.parse(body); } catch (e) {
        json(res, 400, { ok: false, code: 'bad_request' }); return;
      }
      if (String(input.password || '') !== OWNER_PASSWORD) {
        json(res, 401, { ok: false, code: 'wrong_password' }); return;
      }
      const token = crypto.randomBytes(24).toString('hex');
      ownerTokens.set(token, Date.now());
      json(res, 200, { ok: true, token: token });
      return;
    }
    if (url === '/api/owner/reviews') {
      if (!ownerTokenFor(req)) { json(res, 401, { ok: false, code: 'unauthorized' }); return; }
      let input;
      try { input = JSON.parse(body); } catch (e) {
        json(res, 400, { ok: false, code: 'bad_request' }); return;
      }
      if (req.method === 'DELETE' || input._delete) {
        const id = String(input.id || '');
        const list = getReviews().filter(r => r.id !== id);
        if (list.length === getReviews().length) { json(res, 404, { ok: false, code: 'not_found' }); return; }
        saveReviews(list);
        json(res, 200, { ok: true });
        return;
      }
      const clean = s => String(s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
      const text = clean(input.text || '');
      if (text.length < 10 || text.length > 1200) {
        json(res, 400, { ok: false, code: 'bad_review' }); return;
      }
      const biz = ['jamshamCafe', 'jamshamRooftop', 'both'].indexOf(input.biz) !== -1 ? input.biz : 'both';
      const rating = Math.max(1, Math.min(5, parseInt(input.rating, 10) || 5));
      const language = input.language === 'hg' ? 'hg' : 'en';
      const list = getReviews();
      if (input.id) {
        const idx = list.findIndex(r => r.id === input.id);
        if (idx === -1) { json(res, 404, { ok: false, code: 'not_found' }); return; }
        list[idx] = { id: input.id, biz: biz, rating: rating, language: language, text: text, addedAt: list[idx].addedAt || Date.now() };
        saveReviews(list);
        json(res, 200, { ok: true, review: list[idx] });
        return;
      }
      const review = { id: 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), biz: biz, rating: rating, language: language, text: text, addedAt: Date.now() };
      list.push(review);
      saveReviews(list);
      json(res, 200, { ok: true, review: review });
      return;
    }
    if (url === '/api/generate-reviews') {
      if (!rateAllowed('gr:' + ip, 8, 60000)) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, code: 'rate_limited' }));
        return;
      }
      let input;
      try { input = JSON.parse(body); } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, code: 'bad_request' }));
        return;
      }
      if (!process.env.OPENAI_API_KEY) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, code: 'no_key' }));
        return;
      }
      const clean = s => String(s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
      const styleMap = {
        en: 'Natural conversational English, casual but grammatically normal.',
        hi: 'Romanized Hindi written with English letters only. Example: "Khane ka taste bahut accha tha aur service bhi kaafi fast thi." Never use Devanagari.',
        gu: 'Romanized Gujarati written with English letters only. Example: "Jamvanu taste ekdum mast hatu ane service pan sari hati." Never use Gujarati script.',
        hg: 'Natural conversational Indian Hinglish, a casual mix of Hindi and English. Example: "Food ka taste mast tha aur ambience bhi kaafi nice tha."'
      };
      const business = clean(input.business || 'the restaurant').slice(0, 80);
      const location = clean(input.location || '').slice(0, 80);
      const rating = Math.max(1, Math.min(5, parseInt(input.rating, 10) || 5));
      const langs = Array.isArray(input.languages) && input.languages.length
        ? input.languages.map(t => String(t).slice(0, 8)).filter(l => styleMap[l]).slice(0, 4)
        : null;
      const count = langs ? langs.length : Math.max(3, Math.min(5, parseInt(input.count, 10) || 5));
      const langInstruction = langs
        ? 'Write exactly ' + langs.length + ' reviews in this fixed order, numbered 1 to ' + langs.length + '. '
          + langs.map((l, i) => (i + 1) + '. ' + styleMap[l]).join(' ')
          + ' Each review must be written in its listed language style, never in any other language.'
        : (styleMap[input.language] || styleMap.en);
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
        + (input.previousReviews && input.previousReviews.length ? ' Previous reviews already shown to this customer (never repeat them or their openings): ' + JSON.stringify(input.previousReviews.slice(0, 25).map(t => String(t).slice(0, 600))) : '');
      callOpenAI({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        max_tokens: 900,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      }, (status, raw) => {
        if (status !== 200) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, code: 'ai_error' }));
          return;
        }
        let reviews = [];
        try {
          const parsed = JSON.parse(raw);
          let content = parsed.choices && parsed.choices[0] && parsed.choices[0].message
            ? parsed.choices[0].message.content : '';
          content = content.replace(/```json|```/g, '').trim();
          const arr = JSON.parse(content);
          if (Array.isArray(arr)) {
            reviews = arr
              .map(x => (typeof x === 'string' ? x : x && x.text))
              .filter(x => typeof x === 'string' && x.trim().length >= 10)
              .slice(0, count)
              .map(x => x.trim());
          }
        } catch (e) {}
        if (reviews.length < 3) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, code: 'ai_bad_output' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, reviews: reviews.slice(0, count) }));
      });
      return;
    }
    res.writeHead(404); res.end('404 Not Found');
  });
}

const server = https.createServer({ pfx, passphrase: CERT_PASSPHRASE }, (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  if (p === '/jamshamreview') p = '/jamshamreview.html';
  if (p === '/jamshamrooftopreview') p = '/jamshamrooftopreview.html';
  if (p === '/owner') p = '/owner.html';
  if (req.method !== 'GET') { handlePost(req, res); return; }
  if (p === '/api/reviews') {    const q = (req.url.split('?')[1] || '');
    const biz = q.indexOf('business=') !== -1
      ? decodeURIComponent(q.split('business=')[1].split('&')[0]) : 'all';
    const all = getReviews();
    const list = (biz === 'all')
      ? all
      : all.filter(r => r.biz === biz || r.biz === 'both');
    json(res, 200, { ok: true, reviews: list });
    return;
  }
  if (p === '/api/owner/summary') {
    if (!ownerTokenFor(req)) { json(res, 401, { ok: false, code: 'unauthorized' }); return; }
    const all = getReviews();
    const counts = { total: all.length, byRating: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, byBiz: { jamshamCafe: 0, jamshamRooftop: 0, both: 0 } };
    all.forEach(r => {
      counts.byRating[r.rating] = (counts.byRating[r.rating] || 0) + 1;
      counts.byBiz[r.biz] = (counts.byBiz[r.biz] || 0) + 1;
    });
    const ev = getAnalytics();
    const evCount = {};
    const ratingPick = {};
    ev.forEach(e => {
      evCount[e.n] = (evCount[e.n] || 0) + 1;
      if (e.n === 'rating_selected' && e.d && e.d.rating) {
        const k = String(e.d.rating);
        ratingPick[k] = (ratingPick[k] || 0) + 1;
      }
    });
    json(res, 200, {
      ok: true,
      reviews: all,
      counts: counts,
      analytics: { events: ev.length, byEvent: evCount, ratings: ratingPick }
    });
    return;
  }
  const fp = path.resolve(root, '.' + p);
  if (fp !== root && !fp.startsWith(root + path.sep)) {
    res.writeHead(403);
    res.end('403');
    return;
  }
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    const isStatic = /\.(webp|png|jpg|jpeg|svg|ico)$/i.test(ext);
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': isStatic ? 'public, max-age=604800' : 'no-cache'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('HTTPS server ready: https://localhost:' + PORT);
});
