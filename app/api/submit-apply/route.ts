import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body['first-name'] || !body['last-name'] || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const application = {
      firstName: String(body['first-name']),
      lastName: String(body['last-name']),
      email: String(body.email),
      phone: body.phone ? String(body.phone) : 'N/A',
      gradeApplyingFor: body['grade-applying-for'] ? String(body['grade-applying-for']) : 'N/A',
      previousSchool: body['previous-school'] ? String(body['previous-school']) : 'N/A',
      parentName: body['parent-name'] ? String(body['parent-name']) : 'N/A',
      parentContact: body['parent-contact'] ? String(body['parent-contact']) : 'N/A',
      subject: body.subject ? String(body.subject) : 'Application',
      message: String(body.message),
      consent: body.consent === 'on' || body.consent === true,
      source: 'apply-page',
      status: 'received',
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    const res = await db.collection('applications').insertOne(application);

    return NextResponse.json({ message: 'Application submitted successfully!', id: res.insertedId }, { status: 200 });
  } catch (error) {
    console.error('Error in submit-apply route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
