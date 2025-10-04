import AdminPublish from '../../components/AdminPublish';
import { getAllArticleMetas } from '../../lib/fetchers';

export default async function AdminPage() {
  const metas = await getAllArticleMetas();
  return (
    <main>
      <h1>Admin — Unsecured</h1>
      <p>This admin UI is intentionally unsecured. Use for local testing only.</p>

      <section>
        <h2>Articles</h2>
        <ul>
          {metas.map((m) => (
            <li key={m.slug} style={{ marginBottom: 12 }}>
              <strong>{m.title}</strong> — <em>{m.date}</em>
              <div style={{ marginTop: 6 }}>
                <AdminPublish slug={m.slug} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
