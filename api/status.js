export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { incoming, outgoing } = req.body || {};
    // Write to a temp response cookie so GET can read it
    res.setHeader('Set-Cookie', `counts=${incoming},${outgoing}; Path=/; Max-Age=3600`);
    return res.status(200).json({ ok: true, incoming, outgoing });
  }

  // GET — read from query params set by ESP32
  const { incoming, outgoing } = req.query;
  return res.status(200).json({
    ok: true,
    incoming: parseInt(incoming ?? 0),
    outgoing: parseInt(outgoing ?? 0)
  });
}
