/**
 * lib/fetchers.ts
 * Server-side helpers for reading news/article content from the filesystem.
 *
 * Layout:
 *  - content/news/*.json  => metadata files containing { title, slug, date, author, description, image }
 *  - content/news/<slug>.html => optional HTML body for the article
 *
 * These functions are intended to be used in Server Components (App Router).
 */

import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

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

async function readDirSafe(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch {
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
        // ignore invalid JSON but log server-side
        // eslint-disable-next-line no-console
        console.warn('Skipping invalid metadata file:', f, err);
      }
    }
  }

  // sort by date desc if date exists
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
  return metas.map((m) => m.slug);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const metas = await getAllArticleMetas();
  const meta = metas.find((m) => m.slug === slug);
  if (!meta) return null;

  // Prefer MDX/MD content if available
  const mdxPath = path.join(CONTENT_NEWS_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_NEWS_DIR, `${slug}.md`);
  const htmlPath = path.join(CONTENT_NEWS_DIR, `${slug}.html`);

  let contentHtml: string | undefined = undefined;
  let mdxContent: string | undefined = undefined;

  try {
    mdxContent = await fs.readFile(mdxPath, 'utf-8');
  } catch {
    try {
      mdxContent = await fs.readFile(mdPath, 'utf-8');
    } catch {
      try {
        contentHtml = await fs.readFile(htmlPath, 'utf-8');
      } catch {
        // no body available
      }
    }
  }

  // If we found MDX/MD content, parse frontmatter and expose the pure content.
  if (mdxContent) {
    try {
      const parsed = matter(mdxContent);
      // parsed.data contains frontmatter (ignored here because meta is read from JSON),
      // parsed.content is the markdown/mdx body without frontmatter.
      mdxContent = parsed.content;

      // Also prepare an HTML fallback from the mdx content so older render paths show text.
      if (!contentHtml) {
        contentHtml = marked.parse(parsed.content);
      }
    } catch (err) {
      // If parsing fails, fall back to using raw mdxContent for serialization in the page.
      // eslint-disable-next-line no-console
      console.warn('Failed to parse MDX frontmatter with gray-matter:', err);
    }
  } else if (mdxContent == null && contentHtml) {
    // nothing to do, contentHtml already loaded
  }

  // Return meta and whatever content we found (contentHtml may be derived from MDX)
  return { meta, contentHtml, mdxContent } as any;
}
