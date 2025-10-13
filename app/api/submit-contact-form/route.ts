import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { allow, getClientIpFromHeaders } from '../../../lib/rateLimit';
import { sendNewLeadEmail } from '../../../lib/email';

/**
 * POST /api/submit-contact-form
 * Validates, rate-limits, stores to Mongo, and notifies by email.
 */
export async function POST(request: Request) {
  try {
    // Basic IP rate limit
    const ip = getClientIpFromHeaders(request.headers);
    if (!allow(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    // Server-side validation (no external libs)
    const first = (body?.['first-name'] || '').toString().trim();
    const last = (body?.['last-name'] || '').toString().trim();
    const email = (body?.email || '').toString().trim().toLowerCase();
    const phone = body?.['phone-number'] ? body['phone-number'].toString().trim() : '';
    const relationship = body?.relationship ? body.relationship.toString().trim() : '';
    const contactMethod = body?.['contact-method'] ? body['contact-method'].toString().trim() : '';
    const subject = body?.subject ? body.subject.toString().trim() : 'General Inquiry';
    const question = (body?.question || '').toString().trim();
    const consent = body?.consent === 'on' || body?.consent === true;
    const middleName = (body?.middleName || '').toString().trim(); // honeypot
    const startedAt = Number(body?.startedAt) || 0;

    if (!first || !last || !email || !question) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }
    if (question.length < 5 || question.length > 4000) {
      return NextResponse.json({ error: 'Question length is invalid.' }, { status: 400 });
    }
    // Honeypot + minimal time-on-form
    if (middleName) {
      // silently accept to avoid tipping off bots
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    if (startedAt && Date.now() - startedAt < 3000) {
      return NextResponse.json({ error: 'Please take a moment before submitting.' }, { status: 400 });
    }

    const doc = {
      type: 'contact' as const,
      firstName: first,
      lastName: last,
      email,
      phoneNumber: phone || null,
      relationship: relationship || null,
      contactMethod: contactMethod || null,
      subject,
      question,
      consent: !!consent,
      ip,
      ua: request.headers.get('user-agent') || '',
      status: 'new',
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    await db.collection('contact_submissions').insertOne(doc);

    // Fire-and-forget notification (do not block response if it fails)
    sendNewLeadEmail('contact', doc).catch(() => {});

    return NextResponse.json({ message: 'Submission saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error in submit-contact-form route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
