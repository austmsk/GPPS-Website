import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

/**
 * Secured on-demand revalidation endpoint (admin).
 * POST { slug: 'speech-day-2024' }
 *
 * This will:
 *  - revalidate the article path: /news/:slug
 *  - revalidate the news listing: /news
 *
 * Requires an authenticated session (NextAuth).
 */

export async function POST(request: Request) {
  try {
    // verify session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const slug = body?.slug;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug in request body' }, { status: 400 });
    }

    // Revalidate the specific article and the listing
    try {
      revalidatePath(`/news/${slug}`);
      revalidatePath('/news');
    } catch (err) {
      console.error('Revalidation error:', err);
      return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
    }

    return NextResponse.json({ message: `Revalidated /news/${slug} and /news` });
  } catch (err) {
    console.error('Error in admin revalidate route:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
