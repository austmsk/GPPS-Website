import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 * Body: { secret: string, path: string }
 *
 * Protected by REVALIDATE_SECRET environment variable.
 * Example request body:
 *  { "secret": "xxxx", "path": "/news/speech-day-2024" }
 *
 * This will call next/cache's revalidatePath to trigger on-demand revalidation
 * for the given path (App Router).
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = body?.secret;
    const path = body?.path;

    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'No revalidation secret configured' }, { status: 500 });
    }

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 });
    }

    try {
      // revalidatePath is synchronous, but we'll await a resolved Promise to keep parity
      // with possible future async implementations.
      // It must be called on the server.
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    } catch (err: any) {
      console.error('Revalidation error', err);
      return NextResponse.json({ error: 'Revalidation failed', details: String(err) }, { status: 500 });
    }
  } catch (err) {
    console.error('Invalid request to /api/revalidate', err);
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
