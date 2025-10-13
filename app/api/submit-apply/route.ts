import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { allow, getClientIpFromHeaders } from '../../../lib/rateLimit';
import { sendNewLeadEmail } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    // Basic rate limit by IP
    const ip = getClientIpFromHeaders(request.headers);
    if (!allow(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    // Normalize and validate
    const first = (body?.['first-name'] || '').toString().trim();
    const last = (body?.['last-name'] || '').toString().trim();
    const email = (body?.email || '').toString().trim().toLowerCase();
    const subject = (body?.subject || 'Application').toString().trim();
    const message = (body?.message || '').toString().trim();
    const phone = (body?.phone || '').toString().trim();
    const gradeApplyingFor = (body?.['grade-applying-for'] || '').toString().trim();
    const previousSchool = (body?.['previous-school'] || '').toString().trim();
    const parentName = (body?.['parent-name'] || '').toString().trim();
    const parentContact = (body?.['parent-contact'] || '').toString().trim();
    const consent = body?.consent === 'on' || body?.consent === true;
    const middleName = (body?.middleName || '').toString().trim(); // optional honeypot from form if present
    const startedAt = Number(body?.startedAt) || 0;

    if (!first || !last || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }
    if (message.length < 5 || message.length > 8000) {
      return NextResponse.json({ error: 'Message length is invalid.' }, { status: 400 });
    }
    if (middleName) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    if (startedAt && Date.now() - startedAt < 3000) {
      return NextResponse.json({ error: 'Please take a moment before submitting.' }, { status: 400 });
    }

    const application = {
      type: 'apply' as const,
      firstName: first,
      lastName: last,
      email,
      phone: phone || null,
      gradeApplyingFor: gradeApplyingFor || null,
      previousSchool: previousSchool || null,
      parentName: parentName || null,
      parentContact: parentContact || null,
      subject,
      message,
      consent: !!consent,
      source: 'apply-page',
      status: 'received',
      ip,
      ua: request.headers.get('user-agent') || '',
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    const res = await db.collection('applications').insertOne(application);

    // Notify admissions
    sendNewLeadEmail('apply', application).catch(() => {});

    return NextResponse.json({ message: 'Application submitted successfully!', id: res.insertedId }, { status: 200 });
  } catch (error) {
    console.error('Error in submit-apply route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
