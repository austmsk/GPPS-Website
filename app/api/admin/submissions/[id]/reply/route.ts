import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../../lib/auth';
import { connectToDatabase } from '../../../../../../lib/db';
import { sendReplyEmail } from '../../../../../../lib/email';
import { ObjectId } from 'mongodb';

type Body = {
  subject: string;
  message: string;
};

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (process.env.ADMIN_EMAIL && session.user?.email !== process.env.ADMIN_EMAIL)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subject, message } = (await req.json()) as Body;
  if (!subject || !message) {
    return NextResponse.json({ error: 'Missing subject or message' }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  try {
    const _id = new ObjectId(params.id);
    // Look up in both collections
    let coll = 'contact_submissions';
    let sub: any = await db.collection(coll).findOne({ _id });
    if (!sub) {
      coll = 'applications';
      sub = await db.collection(coll).findOne({ _id });
      if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (!sub.email) {
      return NextResponse.json({ error: 'Record has no email address' }, { status: 400 });
    }

    // Send reply email
    await sendReplyEmail(sub.email, subject, message);

    const timelineEntry = {
      at: new Date(),
      by: session.user?.email || 'admin',
      action: 'reply',
      body: message.slice(0, 500),
    };

    await db.collection(coll).updateOne(
      { _id },
      {
        $set: { status: 'replied' },
        // Ensure correct shape for $push typing by using $each
        $push: { timeline: { $each: [timelineEntry] } },
      } as any
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin reply error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
