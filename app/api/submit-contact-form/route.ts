import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';

/**
 * POST /api/submit-contact-form
 * Accepts JSON body from contact form and saves to MongoDB.
 *
 * Expected body fields:
 *  - "first-name" (string)
 *  - "last-name"  (string)
 *  - email        (string)
 *  - question     (string)
 * Optional:
 *  - "phone-number", "relationship", "contact-method", "subject", "consent"
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body['first-name'] || !body['last-name'] || !body.email || !body.question) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const submission = {
      firstName: String(body['first-name']),
      lastName: String(body['last-name']),
      email: String(body.email),
      phoneNumber: body['phone-number'] ? String(body['phone-number']) : 'N/A',
      relationship: body.relationship ? String(body.relationship) : 'N/A',
      contactMethod: body['contact-method'] ? String(body['contact-method']) : 'N/A',
      subject: body.subject ? String(body.subject) : 'General Inquiry',
      question: String(body.question),
      consent: body.consent === 'on' || body.consent === true,
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    await db.collection('submissions').insertOne(submission);

    return NextResponse.json({ message: 'Submission saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error in submit-contact-form route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
