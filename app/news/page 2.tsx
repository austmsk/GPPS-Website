export const revalidate = 300; // 5 minutes

import Link from 'next/link';
import { getAllArticleMetas, type ArticleMeta } from '../../lib/fetchers';

export default async function NewsListPage() {
  const metas = await getAllArticleMetas();

  return (
    <section>
      <h1>News & Events</h1>
      <p>Latest news and announcements from GPPS.</p>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
        {metas.length === 0 && <li>No articles published yet.</li>}
        {metas.map((m: ArticleMeta) => (
          <li key={m.slug} style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
            <article>
              <h2 style={{ margin: 0 }}>
                <Link href={`/news/${m.slug}`}>{m.title}</Link>
              </h2>
              <p style={{ margin: '6px 0', color: '#666' }}>
                {m.author ? `${m.author} • ` : ''}{m.date ? new Date(m.date).toLocaleDateString() : ''}
              </p>
              {m.description && <p style={{ marginTop: 8 }}>{m.description}</p>}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
