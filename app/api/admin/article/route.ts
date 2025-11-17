import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

const CONTENT_NEWS_DIR = path.join(process.cwd(), 'content', 'news');

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const slug = body?.slug as string;
  const meta = body?.meta ?? {};
  const mdxContent: string = body?.mdxContent ?? '';
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Provide a slug using lowercase letters, numbers, and dashes' }, { status: 400 });
  }

  const filePath = path.join(CONTENT_NEWS_DIR, `${slug}.mdx`);
  try {
    // If exists, prevent overwrite (use PUT to update existing)
    await fs.access(filePath);
    return NextResponse.json({ error: 'Article already exists. Use PUT to update.' }, { status: 409 });
  } catch {
    // ok, file doesn't exist yet
  }

  const frontmatter = {
    title: meta.title ?? slug,
    slug,
    date: meta.date ?? new Date().toISOString(),
    author: meta.author ?? undefined,
    description: meta.description ?? undefined,
    image: meta.image ?? undefined,
  };

  const fileContent = matter.stringify(mdxContent ?? '', frontmatter);

  try {
    await fs.mkdir(CONTENT_NEWS_DIR, { recursive: true });
    await fs.writeFile(filePath, fileContent, 'utf-8');
  } catch (e) {
    console.error('Write error', e);
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }

  try {
    revalidatePath(`/news/${slug}`);
    revalidatePath('/news');
  } catch (e) {
    console.warn('Revalidate failed', e);
  }

  return NextResponse.json({ message: 'Created', slug });
}
