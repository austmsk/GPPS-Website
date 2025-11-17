import './globals.css';
import '../styles/site.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { headerFont, buttonFont, paragraphFont, newsHeaderFont, newsParagraphFont, newsAuthorFont } from './fonts';

export const metadata = {
  title: 'GPPS',
  description: 'Genesis Primary & Preparatory School',
};

const fontVars = `${paragraphFont.variable} ${headerFont.variable} ${buttonFont.variable} ${newsHeaderFont.variable} ${newsParagraphFont.variable} ${newsAuthorFont.variable}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <Header />
        <main style={{ maxWidth: 1100, margin: '36px auto', padding: '0 16px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
