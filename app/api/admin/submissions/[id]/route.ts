import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import { connectToDatabase } from '../../../../../lib/db';
import { ObjectId } from 'mongodb';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (process.env.ADMIN_EMAIL && session.user?.email !== process.env.ADMIN_EMAIL)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { db } = await connectToDatabase();
  try {
    const _id = new ObjectId(params.id);
    let doc =
      (await db.collection('contact_submissions').findOne({ _id })) ||
      (await db.collection('applications').findOne({ _id }));
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...doc, _id: doc._id.toString() });
  } catch (err) {
    console.error('admin submissions get one error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (process.env.ADMIN_EMAIL && session.user?.email !== process.env.ADMIN_EMAIL)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { db } = await connectToDatabase();
  try {
    const body = await req.json();
    const _id = new ObjectId(params.id);
    const updates: any = {};
    if (body.status) updates.status = String(body.status);
    const push: any = {};
    if (body.internalNotesAppend) {
      push.internalNotes = String(body.internalNotesAppend);
    }
    let coll = 'contact_submissions';
    let found = await db.collection(coll).findOne({ _id });
    if (!found) {
      coll = 'applications';
      found = await db.collection(coll).findOne({ _id });
      if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const updateDoc: any = {};
    if (Object.keys(updates).length) updateDoc.$set = updates;
    if (Object.keys(push).length) updateDoc.$push = push;
    if (Object.keys(updateDoc).length === 0) {
      return NextResponse.json({ ok: true });
    }
    await db.collection(coll).updateOne({ _id }, updateDoc);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin submissions patch error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
