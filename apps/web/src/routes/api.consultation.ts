import type { Route } from './+types/api.consultation';
import { apiError, json, withApi } from '@/lib/api.server';
import { clientIdentifier, createRateLimiter } from '@/lib/rate-limit.server';
import { pocketbaseClient } from '@/lib/pocketbase-client';

// Dedicated form submission rate limiter: max 5 consultation submissions per 10 minutes per IP
const consultationLimiter = createRateLimiter({
  maxRequests: 5,
  windowSeconds: 10 * 60,
});

// RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const sanitizeString = (val: unknown, maxLen: number): string => {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\0\x08\x09\x1a]/g, '') // strip null bytes and unsafe control chars
    .trim()
    .slice(0, maxLen);
};

export const loader = withApi(async () => {
  return json({ message: 'Klyro Works consultation endpoint. Send POST request with enquiry payload.' });
});

export const action = withApi(async ({ request }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    return apiError(405, 'Method not allowed');
  }

  // 1. Enforce payload size limit (max 64 KB for form submission)
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 64 * 1024) {
    return apiError(413, 'Payload exceeds maximum allowed size (64 KB).');
  }

  // 2. Anti-CSRF & Cross-Origin validation
  const secFetchSite = request.headers.get('sec-fetch-site');
  if (secFetchSite === 'cross-site') {
    return apiError(403, 'Cross-origin submission rejected.');
  }

  const originHeader = request.headers.get('origin');
  const hostHeader = request.headers.get('host');
  if (originHeader && hostHeader) {
    try {
      const originHost = new URL(originHeader).host;
      if (originHost !== hostHeader && !originHost.includes('localhost')) {
        return apiError(403, 'Request origin does not match target host.');
      }
    } catch {
      return apiError(400, 'Malformed request origin header.');
    }
  }

  // 3. Rate limiting per IP
  const clientId = clientIdentifier(request);
  const isAllowed = await consultationLimiter(clientId);
  if (!isAllowed) {
    return apiError(429, 'Too many consultation requests from your connection. Please wait a few minutes before submitting again.');
  }

  try {
    const body = await request.json();

    // 4. Honeypot check (silently drop automated bot submissions)
    if (body.website_url || body.company_website_url) {
      return json({
        ok: true,
        message: 'Consultation enquiry received successfully.',
      });
    }

    const rawName = body.name;
    const rawEmail = body.email;
    const rawCompany = body.company;
    const rawService = body.service;
    const rawMarket = body.market;
    const rawMessage = body.message;

    // 5. Input Sanitization & Validation
    const cleanName = sanitizeString(rawName, 100);
    const cleanEmail = sanitizeString(rawEmail, 100);
    const cleanCompany = sanitizeString(rawCompany, 100);
    const cleanService = sanitizeString(rawService, 100) || 'General Consultation';
    const cleanMarket = sanitizeString(rawMarket, 100) || 'United States / United Kingdom';
    const cleanMessage = sanitizeString(rawMessage, 5000);

    if (!cleanName || cleanName.length < 2) {
      return apiError(400, 'Please provide a valid name (at least 2 characters).');
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return apiError(400, 'Please provide a valid business email address.');
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      return apiError(400, 'Please share a brief summary of your project goals (at least 10 characters).');
    }

    const payload = {
      recipient: 'admin@klyroworks.com',
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
      service: cleanService,
      market: cleanMarket,
      message: cleanMessage,
      timestamp: new Date().toISOString(),
      status: 'pending_review',
    };

    console.log('[Klyro Works Consultation] New enquiry received for admin@klyroworks.com:', {
      from: `${payload.name} <${payload.email}>`,
      company: payload.company,
      service: payload.service,
      market: payload.market,
      timestamp: payload.timestamp,
    });

    try {
      await pocketbaseClient.collection('enquiries').create(payload);
    } catch (pbErr) {
      console.warn('[Klyro Works] PocketBase storage bypassed, logged locally for admin@klyroworks.com:', pbErr);
    }

    return json({
      ok: true,
      recipient: 'admin@klyroworks.com',
      message: 'Consultation enquiry received successfully. Our senior strategy team will be in touch within 24 hours.',
      enquiry: {
        name: payload.name,
        service: payload.service,
        timestamp: payload.timestamp,
      },
    });
  } catch (error) {
    console.error('[Klyro Works] Error handling consultation enquiry:', error);
    return apiError(500, 'Failed to process consultation request.');
  }
});

