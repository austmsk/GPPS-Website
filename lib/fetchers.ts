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
  image?: string; // aka cover image
};

export type Article = {
  meta: ArticleMeta;
  contentHtml?: string; // HTML fallback for non-MDX renderers
  mdxContent?: string;  // raw MDX/MD body (no frontmatter)
};

const CONTENT_NEWS_DIR = path.join(process.cwd(), 'content', 'news');

async function readDirSafe(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

function toSlugFromFilename(filename: string) {
  return filename.replace(/\.(mdx|md)$/i, '');
}

export async function getAllArticleMetas(): Promise<ArticleMeta[]> {
  const files = await readDirSafe(CONTENT_NEWS_DIR);

  const mdxFiles = files.filter((f) => /\.mdx?$/i.test(f));
  const metas: ArticleMeta[] = [];

  for (const f of mdxFiles) {
    try {
      const raw = await fs.readFile(path.join(CONTENT_NEWS_DIR, f), 'utf-8');
      const parsed = matter(raw);
      const fm = parsed.data as Partial<ArticleMeta>;

      const slug = fm.slug ?? toSlugFromFilename(f);
      const title = fm.title ?? slug;

      metas.push({
        title,
        slug,
        date: fm.date,
        author: fm.author,
        description: fm.description,
        image: fm.image,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Skipping invalid MDX file:', f, err);
    }
  }

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
  const mdxPath = path.join(CONTENT_NEWS_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_NEWS_DIR, `${slug}.md`);

  let filePath: string | null = null;
  try {
    await fs.access(mdxPath);
    filePath = mdxPath;
  } catch {
    try {
      await fs.access(mdPath);
      filePath = mdPath;
    } catch {
      return null;
    }
  }

  const raw = await fs.readFile(filePath!, 'utf-8');
  const parsed = matter(raw);
  const fm = parsed.data as Partial<ArticleMeta>;

  const meta: ArticleMeta = {
    title: fm.title ?? slug,
    slug: fm.slug ?? slug,
    date: fm.date,
    author: fm.author,
    description: fm.description,
    image: fm.image,
  };

  const mdxContent = parsed.content;
  const contentHtml = marked.parse(mdxContent);

  return { meta, contentHtml, mdxContent };
}