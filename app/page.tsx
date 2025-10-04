import React from 'react';

export const revalidate = 86400; // 24h

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Grace Primary & Preparatory School</h1>
      <p>Welcome — this is the migrated Next.js home placeholder. Replace with migrated content from src/home-page.html.</p>

      <nav style={{ marginTop: 20 }}>
        <a href="/news" style={{ marginRight: 12 }}>News</a>
        <a href="/apply" style={{ marginRight: 12 }}>Apply</a>
        <a href="/contact-us">Contact</a>
      </nav>

      <section style={{ marginTop: 32 }}>
        <h2>Latest</h2>
        <p>News and events are available under <a href="/news">/news</a>.</p>
      </section>
    </section>
  );
}
