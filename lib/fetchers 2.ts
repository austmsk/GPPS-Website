/**
 * lib/fetchers.ts
 * Helpers for reading news/article content from the filesystem (server-side).
 *
 * Exports:
 *  - getAllArticleSlugs()
 *  - getAllArticlesMeta()
 *  - getArticleBySlug(slug)
 *
 * Content layout (content/news/):
 *  - <any>.json   => metadata with a `slug` field
 *  - <slug>.html  => HTML body for the article (optional)
 *
 * This is implemented for Server Components / Route Handlers only (uses fs).
 */

import fs from 'fs/promises';
import path from 'path';

export type ArticleMeta = {
  title: string;
  slug: string;
  date?: string;
  author?: string;
  description?: string;
  image?: string;
};

export type Article = {
  meta: ArticleMeta;
  contentHtml?: string;
};

const CONTENT_NEWS_DIR = path.join(process.cwd(), 'content', 'news');

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch (err) {
    // If the directory doesn't exist, return empty array
    return [];
  }
}

export async function getAllArticleMetas(): Promise<ArticleMeta[]> {
  const files = await readDirSafe(CONTENT_NEWS_DIR);
  const metas: ArticleMeta[] = [];

  for (const f of files) {
    if (f.endsWith('.json')) {
      try {
        const raw = await fs.readFile(path.join(CONTENT_NEWS_DIR, f), 'utf-8');
        const parsed = JSON.parse(raw) as ArticleMeta;
        if (parsed && parsed.slug) {
          metas.push(parsed);
        }
      } catch (err) {
        // ignore invalid files but log to console for debugging
        // (server-side only)
        // eslint-disable-next-line no-console
        console.warn('Skipping invalid JSON metadata file:', f, err);
      }
    }
  }

  // sort by date desc if date field exists
  metas.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return metas;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const metas = await getAllArticleMetas();
  return metas.map(m => m.slug);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const metas = await getAllArticleMetas();
  const meta = metas.find(m => m.slug === slug);
  if (!meta) return null;

  // Look for an HTML file that matches the slug
  const htmlPath = path.join(CONTENT_NEWS_DIR, `${slug}.html`);
  let contentHtml: string | undefined = undefined;
  try {
    contentHtml = await fs.readFile(htmlPath, 'utf-8');
  } catch (err) {
    // If there's no HTML file, leave contentHtml undefined.
    // Consumers can render meta-only preview.
  }

  return { meta, contentHtml };
}
