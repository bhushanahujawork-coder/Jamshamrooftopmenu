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
    res.status(405).json({ ok: false });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ ok: false });
    return;
  }
  let events = [];
  try {
    const body = JSON.parse(req.body || '{}');
    if (Array.isArray(body.events)) events = body.events.slice(0, 100);
  } catch (e) {}
  for (const ev of events.slice(0, 50)) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[analytics]', JSON.stringify(ev).slice(0, 500));
    }
  }
  res.status(204).end();
}
