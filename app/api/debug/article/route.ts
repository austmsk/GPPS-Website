import { NextResponse } from 'next/server';
import { getArticleBySlug } from '../../../../lib/fetchers';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Provide slug query param, e.g. ?slug=speech-day-2024' }, { status: 400 });
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const mdxPreview = article.mdxContent ? String(article.mdxContent).slice(0, 2000) : null;
  const htmlPreview = article.contentHtml ? String(article.contentHtml).slice(0, 2000) : null;

  return NextResponse.json({
    slug,
    meta: article.meta,
    hasMdx: !!article.mdxContent,
    mdxLength: article.mdxContent ? String(article.mdxContent).length : 0,
    mdxPreview,
    hasHtml: !!article.contentHtml,
    htmlLength: article.contentHtml ? String(article.contentHtml).length : 0,
    htmlPreview,
  });
}
