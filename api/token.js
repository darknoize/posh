const crypto = require('crypto');

const TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getFormSecret() {
  return process.env.FORM_SECRET || '';
}

function generateToken(secret) {
  const timestamp = Date.now().toString();
  const sig = crypto.createHmac('sha256', secret).update(timestamp).digest('hex');
  return `${timestamp}.${sig}`;
}

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const secret = getFormSecret();
  if (!secret) {
    return res.status(500).json({ ok: false, error: 'Token service not configured' });
  }

  const token = generateToken(secret);
  return res.status(200).json({ ok: true, token, expiresIn: TOKEN_TTL_MS / 1000 });
};
