import type { Metadata } from 'next';
import './globals.css';
import '../styles/site.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { headerFont, buttonFont, paragraphFont, newsHeaderFont, newsParagraphFont, newsAuthorFont } from './fonts';

export const metadata: Metadata = {
  title: 'Genesis Primary & Preparatory School',
  description: 'Genesis Primary & Preparatory School (GPPS) is a nurturing learning environment focused on strong academics, character development, and community for children in Uganda.',
  keywords: [
    'Genesis Primary and Preparatory School',
    'GPPS',
    'primary school Uganda',
    'preparatory school',
    'Kampala schools',
    'Uganda education',
  ],
  metadataBase: new URL('https://www.premierprepsch.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Genesis Primary & Preparatory School',
    description:
      'Learn about Genesis Primary & Preparatory School (GPPS): admissions, academics, campus life, and our mission to empower the next generation.',
    url: 'https://www.premierprepsch.org',
    siteName: 'Genesis Primary & Preparatory School',
    images: [
      {
        url: '/images/HP_IMG6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Genesis Primary & Preparatory School campus and students',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genesis Primary & Preparatory School',
    description:
      'Discover Genesis Primary & Preparatory School (GPPS) — a caring, high-quality learning environment for children in Uganda.',
    images: ['/images/HP_IMG6.jpeg'],
  },
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
