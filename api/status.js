// api/status.js — fetches latest count data from OOCSI

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const response = await fetch(
      'https://oocsi.id.tue.nl/data/Dropin_Count',
      { headers: { 'Accept': 'application/json' } }
    );

    const text = await response.text();
    return res.status(200).json({ ok: true, data: text, status: response.status });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
