import type { Route } from './+types/api.consultation';
import { apiError, json, withApi } from '@/lib/api.server';
import { pocketbaseClient } from '@/lib/pocketbase-client';

export const loader = withApi(async () => {
  return json({ message: 'Klyro Works consultation endpoint. Send POST request with enquiry payload.' });
});

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return apiError(405, 'Method not allowed');
  }

  try {
    const body = await request.json();
    const { name, email, company, service, market, message } = body;

    if (!name || !email || !message) {
      return apiError(400, 'Missing required fields: name, email, and message are mandatory.');
    }

    const payload = {
      recipient: 'admin@klyroworks.com',
      name: String(name).trim(),
      email: String(email).trim(),
      company: company ? String(company).trim() : '',
      service: service ? String(service).trim() : 'General Consultation',
      market: market ? String(market).trim() : 'United States / United Kingdom',
      message: String(message).trim(),
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
}

