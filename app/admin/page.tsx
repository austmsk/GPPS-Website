import AdminPublish from '../../components/AdminPublish';
import { getAllArticleMetas } from '../../lib/fetchers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // Require authenticated session
  const session = await getServerSession();
  if (!session) {
    // Redirect to sign-in page (NextAuth signIn)
    redirect('/signin');
  }

  const metas = await getAllArticleMetas();
  return (
    <main>
      <h1>Admin</h1>
      <p>Signed in as <strong>{session?.user?.email}</strong></p>

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
