import { NextResponse } from 'next/server';
import { getAllArticleMetas } from '../../lib/fetchers';

const SITE_URL = process.env.SITE_URL || 'https://yourdomain.com';

export async function GET() {
  type UrlEntry = { loc: string; lastmod?: string; priority: number; changefreq: string; };

  const pages: UrlEntry[] = [
    { loc: `${SITE_URL}/`, priority: 1.0, changefreq: 'daily' },
    { loc: `${SITE_URL}/news`, priority: 0.8, changefreq: 'hourly' },
    { loc: `${SITE_URL}/contact-us`, priority: 0.5, changefreq: 'monthly' },
    { loc: `${SITE_URL}/apply`, priority: 0.5, changefreq: 'monthly' },
    // Add other static pages here if desired
  ];

  const articles = await getAllArticleMetas();
  const urls: UrlEntry[] = [
    ...pages,
    ...articles.map((a) => ({
      loc: `${SITE_URL}/news/${a.slug}`,
      lastmod: a.date ?? undefined,
      priority: 0.7,
      changefreq: 'weekly',
    })),
  ];

  const urlset = urls
    .map((u) => {
      const lastmodTag = u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : '';
      return `
    <url>
      <loc>${u.loc}</loc>
      ${lastmodTag}
      <changefreq>${u.changefreq}</changefreq>
      <priority>${u.priority}</priority>
    </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      // Cache sitemap for 24 hours at CDN
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
