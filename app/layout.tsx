import './globals.css';

export const metadata = {
  title: 'GPPS',
  description: 'Grace Primary & Preparatory School',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 20, borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <a href="/" style={{ fontWeight: 700, textDecoration: 'none' }}>GPPS</a>
          </div>
        </header>
        <main style={{ maxWidth: 1100, margin: '36px auto', padding: '0 16px' }}>{children}</main>
        <footer style={{ padding: 20, borderTop: '1px solid #eee', marginTop: 40, textAlign: 'center' }}>
          <small>© {new Date().getFullYear()} GPPS</small>
        </footer>
      </body>
    </html>
  );
}
