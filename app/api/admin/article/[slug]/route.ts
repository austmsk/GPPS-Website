import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import { getArticleBySlug } from '../../../../../lib/fetchers';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

const CONTENT_NEWS_DIR = path.join(process.cwd(), 'content', 'news');

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = params;
  const article = await getArticleBySlug(slug);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const meta = body?.meta ?? {};
  const mdxContent: string = body?.mdxContent ?? '';
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  // Compose frontmatter + body
  const frontmatter = {
    title: meta.title ?? slug,
    slug,
    date: meta.date ?? undefined,
    author: meta.author ?? undefined,
    description: meta.description ?? undefined,
    image: meta.image ?? undefined,
  };

  const fileContent = matter.stringify(mdxContent ?? '', frontmatter);
  const filePath = path.join(CONTENT_NEWS_DIR, `${slug}.mdx`);

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

  return NextResponse.json({ message: 'Saved', slug });
}
