import './globals.css';
import '../styles/site.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'GPPS',
  description: 'Genesis Primary & Preparatory School',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ maxWidth: 1100, margin: '36px auto', padding: '0 16px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
