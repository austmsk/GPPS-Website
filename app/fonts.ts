import localFont from 'next/font/local';

// Map Next.js local fonts to CSS variables already used across the site
// These variables will be attached to <html> via className in app/layout.tsx

export const headerFont = localFont({
  src: '../public/fonts/Rajdhani-Variable.ttf',
  variable: '--header-font',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

export const buttonFont = localFont({
  src: '../public/fonts/Chillax-Variable.ttf',
  variable: '--button-font',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

export const paragraphFont = localFont({
  src: '../public/fonts/GeneralSans-Variable.ttf',
  variable: '--main-font',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

export const newsHeaderFont = localFont({
  src: '../public/fonts/Boska-Light.ttf', // keep light for headings like legacy
  variable: '--news-header-font',
  weight: '300',
  display: 'swap',
  preload: false,
});

export const newsParagraphFont = localFont({
  src: '../public/fonts/GeneralSans-Variable.ttf',
  variable: '--news-paragraph-font',
  weight: '100 900',
  display: 'swap',
  preload: false,
});

export const newsAuthorFont = localFont({
  src: '../public/fonts/Boska-Variable.ttf',
  variable: '--news-author-font',
  weight: '100 900',
  display: 'swap',
  preload: false,
});
