import AdminPublish from '../../components/AdminPublish';
import AdminEditor from '../../components/AdminEditor';
import SignOutButton from '../../components/SignOutButton';
import { getAllArticleMetas } from '../../lib/fetchers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // Require authenticated session
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect to sign-in page (NextAuth signIn)
    redirect('/signin');
  }

  const metas = await getAllArticleMetas();
  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Admin</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>Signed in as <strong>{session?.user?.email}</strong></span>
          <SignOutButton />
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Articles</h2>
        <ul>
          {metas.map((m) => (
            <li key={m.slug} style={{ marginBottom: 12 }}>
              <strong>{m.title}</strong> — <em>{m.date}</em>
              <div style={{ marginTop: 6 }}>
                <AdminPublish slug={m.slug} />
                <a href={`/news/${m.slug}`} className="btn btn-ghost" style={{ marginLeft: 8 }} target="_blank" rel="noopener noreferrer">View →</a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AdminEditor metas={metas} />
    </main>
  );
}
