// api/status.js
// Stores and retrieves package counts in memory

let counts = { incoming: 0, outgoing: 0, updatedAt: null };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ESP32 posts new counts here
  if (req.method === 'POST') {
    const { incoming, outgoing } = req.body || {};
    if (incoming !== undefined) counts.incoming = incoming;
    if (outgoing !== undefined) counts.outgoing = outgoing;
    counts.updatedAt = new Date().toISOString();
    console.log('Counts updated:', counts);
    return res.status(200).json({ ok: true });
  }

  // App fetches counts here
  return res.status(200).json({ ok: true, ...counts });
}
