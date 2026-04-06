const crypto = require('crypto');
const nodemailer = require('nodemailer');

const WINDOW_MS = 15 * 60 * 1000;
const TOKEN_TTL_MS = 10 * 60 * 1000;
const IP_MAX_REQUESTS = 5;
const EMAIL_MAX_REQUESTS = 3;

function generateRequestId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function normalize(value) {
  return String(value || '').trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch (error) {
    return false;
  }
}

function isAllowedOrigin(req) {
  const originHeader = req.headers.origin || req.headers.referer || '';
  if (!originHeader) return true;

  const envOrigins = normalize(process.env.ALLOWED_ORIGINS)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  const fallbackOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://posh-rust.vercel.app',
    'http://localhost:3000',
    'http://localhost:4173',
    'http://localhost:5500'
  ].filter(Boolean);

  const allowed = envOrigins.length ? envOrigins : fallbackOrigins;
  return allowed.some((allowedOrigin) => originHeader.startsWith(allowedOrigin));
}

function getRateStore() {
  if (!globalThis.__quickMessageRateStore) {
    globalThis.__quickMessageRateStore = new Map();
  }
  return globalThis.__quickMessageRateStore;
}

function isRateLimited(key, maxRequests) {
  const now = Date.now();
  const store = getRateStore();

  for (const [existingKey, value] of store.entries()) {
    if (now - value.start > WINDOW_MS) {
      store.delete(existingKey);
    }
  }

  const entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  store.set(key, entry);
  return entry.count > maxRequests;
}

function detectSpam({ name, email, website, comment }) {
  const joined = `${name} ${email} ${website} ${comment}`.toLowerCase();
  const keywordPattern = /(viagra|casino|bitcoin|crypto\s*investment|forex|loan\s*approval|seo\s*service|buy\s*now|work\s*from\s*home|click\s*here)/i;

  if (keywordPattern.test(joined)) {
    return 'Matched blocked spam keywords';
  }

  const linkCount = (comment.match(/(https?:\/\/|www\.)/gi) || []).length;
  if (linkCount > 2) {
    return 'Too many links in message';
  }

  if (/(.)\1{9,}/.test(comment)) {
    return 'Repeated character spam pattern';
  }

  if (/<\s*script|javascript:|onerror\s*=|onload\s*=/i.test(joined)) {
    return 'Script injection pattern detected';
  }

  return '';
}

function verifyFormToken(token) {
  const secret = normalize(process.env.FORM_SECRET);
  if (!secret) return true; // skip verification if secret not configured
  if (!token || typeof token !== 'string') return false;

  const dot = token.indexOf('.');
  if (dot === -1) return false;

  const tsStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const ts = Number(tsStr);

  if (!Number.isFinite(ts) || Date.now() - ts > TOKEN_TTL_MS) return false;

  const expected = crypto.createHmac('sha256', secret).update(tsStr).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
}

function missingSmtpConfig() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
  return required.filter((key) => !normalize(process.env[key]));
}

function auditLog(level, requestId, timestamp, message, data = {}) {
  const logger = level === 'error' ? console.error : console.info;
  logger(
    '[quick-message]',
    JSON.stringify({
      requestId,
      timestamp,
      message,
      ...data
    })
  );
}

module.exports = async (req, res) => {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    auditLog('info', requestId, timestamp, 'Rejected non-POST method', { method: req.method });
    return res.status(405).json({ ok: false, error: 'Method not allowed', requestId, timestamp });
  }

  if (!isAllowedOrigin(req)) {
    auditLog('info', requestId, timestamp, 'Rejected origin');
    return res.status(403).json({ ok: false, error: 'Origin not allowed', requestId, timestamp });
  }

  const formToken = req.headers['x-form-token'] || '';
  if (!verifyFormToken(formToken)) {
    auditLog('info', requestId, timestamp, 'Invalid or expired form token');
    return res.status(403).json({ ok: false, error: 'Invalid or expired form token', requestId, timestamp });
  }

  const ip = getClientIp(req);
  if (isRateLimited(`ip:${ip}`, IP_MAX_REQUESTS)) {
    auditLog('info', requestId, timestamp, 'Rate limited by IP', { ip });
    return res.status(429).json({ ok: false, error: 'Too many requests from this IP', requestId, timestamp });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  const name = normalize(body.name);
  const phone = normalize(body.phone);
  const email = normalize(body.email).toLowerCase();
  const website = normalize(body.website);
  const comment = normalize(body.comment);
  const agree = Boolean(body.agree);
  const company = normalize(body.company);

  if (company) {
    auditLog('info', requestId, timestamp, 'Honeypot triggered', { ip });
    return res.status(200).json({ ok: true, requestId, timestamp });
  }

  if (!name || !phone || !email || !website || !comment || !agree) {
    auditLog('info', requestId, timestamp, 'Validation failed: missing fields', { ip, email });
    return res.status(400).json({ ok: false, error: 'Missing required fields', requestId, timestamp });
  }

  if (name.length > 120 || phone.length > 60 || email.length > 180 || website.length > 300 || comment.length > 5000) {
    auditLog('info', requestId, timestamp, 'Validation failed: input too long', { ip, email });
    return res.status(400).json({ ok: false, error: 'Input exceeds allowed length', requestId, timestamp });
  }

  if (!isEmail(email) || !isUrl(website)) {
    auditLog('info', requestId, timestamp, 'Validation failed: invalid email or URL', { ip, email, website });
    return res.status(400).json({ ok: false, error: 'Invalid email or website format', requestId, timestamp });
  }

  if (isRateLimited(`email:${email}`, EMAIL_MAX_REQUESTS)) {
    auditLog('info', requestId, timestamp, 'Rate limited by email', { ip, email });
    return res.status(429).json({ ok: false, error: 'Too many requests for this email', requestId, timestamp });
  }

  const spamReason = detectSpam({ name, email, website, comment });
  if (spamReason) {
    auditLog('info', requestId, timestamp, 'Spam filtered', { ip, email, reason: spamReason });
    return res.status(422).json({ ok: false, error: 'Message flagged as spam', requestId, timestamp });
  }

  const missingConfig = missingSmtpConfig();
  if (missingConfig.length) {
    auditLog('error', requestId, timestamp, 'Missing SMTP configuration', { missingConfig });
    return res.status(500).json({ ok: false, error: `Missing SMTP config: ${missingConfig.join(', ')}`, requestId, timestamp });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const toAddress = normalize(process.env.SMTP_TO) || 'info@poshmfg.com';
  const fromAddress = process.env.SMTP_FROM;

  const notificationHtml = `
    <h2>New Quick Message</h2>
    <p><strong>Request ID:</strong> ${requestId}</p>
    <p><strong>Timestamp (UTC):</strong> ${timestamp}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Website:</strong> ${website}</p>
    <p><strong>Comment:</strong></p>
    <p>${comment.replace(/\n/g, '<br>')}</p>
  `;

  const notificationText = [
    'New Quick Message',
    `Request ID: ${requestId}`,
    `Timestamp (UTC): ${timestamp}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Website: ${website}`,
    `Comment: ${comment}`
  ].join('\n');

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `POSH Website Quick Message [${requestId}]`,
      text: notificationText,
      html: notificationHtml
    });

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThanks for contacting POSH. We received your message and will follow up shortly.\n\nReference ID: ${requestId}\n\n- POSH Team`
    });

    auditLog('info', requestId, timestamp, 'Message delivered', { ip, email });
    return res.status(200).json({ ok: true, requestId, timestamp });
  } catch (error) {
    auditLog('error', requestId, timestamp, 'Email delivery failed', { ip, email, detail: error.message });
    return res.status(502).json({ ok: false, error: 'Email delivery failed', requestId, timestamp });
  }
};
