import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';

type Query = {
  type?: 'contact' | 'apply' | 'all';
  status?: string;
  q?: string;
  page?: string;
  pageSize?: string;
};

function toNumber(v: string | undefined, d: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : d;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (process.env.ADMIN_EMAIL && session.user?.email !== process.env.ADMIN_EMAIL)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query: Query = {
    type: (searchParams.get('type') as any) || 'contact',
    status: searchParams.get('status') || undefined,
    q: searchParams.get('q') || undefined,
    page: searchParams.get('page') || undefined,
    pageSize: searchParams.get('pageSize') || undefined,
  };

  const page = toNumber(query.page, 1);
  const pageSize = Math.min(toNumber(query.pageSize, 20), 100);

  const { db } = await connectToDatabase();

  const buildFilter = (q: Query) => {
    const filter: any = {};
    if (q.status) filter.status = q.status;
    if (q.q) {
      const regex = new RegExp(q.q, 'i');
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { subject: regex },
        { question: regex },
        { message: regex },
      ];
    }
    return filter;
  };

  try {
    const filter = buildFilter(query);

    if (query.type === 'contact' || query.type === undefined) {
      const coll = db.collection('contact_submissions');
      const total = await coll.countDocuments(filter);
      const docs = await coll
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      const items = docs.map((d: any) => ({ ...d, _id: d._id.toString(), type: 'contact' as const }));
      return NextResponse.json({ items, page, pageSize, total });
    }

    if (query.type === 'apply') {
      const coll = db.collection('applications');
      const total = await coll.countDocuments(filter);
      const docs = await coll
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      const items = docs.map((d: any) => ({ ...d, _id: d._id.toString(), type: 'apply' as const }));
      return NextResponse.json({ items, page, pageSize, total });
    }

    // all: naive merge from both, then sort and paginate in memory (okay for small admin lists)
    const [contacts, applies] = await Promise.all([
      db.collection('contact_submissions').find(buildFilter(query)).toArray(),
      db.collection('applications').find(buildFilter(query)).toArray(),
    ]);
    const merged = [
      ...contacts.map((d: any) => ({ ...d, _id: d._id.toString(), type: 'contact' as const })),
      ...applies.map((d: any) => ({ ...d, _id: d._id.toString(), type: 'apply' as const })),
    ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const total = merged.length;
    const slice = merged.slice((page - 1) * pageSize, page * pageSize);
    return NextResponse.json({ items: slice, page, pageSize, total });
  } catch (err) {
    console.error('admin submissions list error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
