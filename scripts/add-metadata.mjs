// scripts/add-metadata.mjs
// Add a minimal export const metadata to app/*/page.tsx files that don't have it yet.

import fs from 'fs';
import path from 'path';

const APP_DIR = 'app';

function titleCase(slug) {
  return slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function addMetadataToFile(dir) {
  const file = path.join(APP_DIR, dir, 'page.tsx');
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  // Skip if already has metadata
  if (content.includes('export const metadata')) {
    console.log('skip (metadata exists):', file);
    return;
  }

  const nice = titleCase(dir);
  const metaBlock = `
export const metadata = {
  title: '${nice} | GPPS',
  description: '${nice} page for GPPS.',
};
`;

  if (content.includes('export const revalidate')) {
    content = content.replace(
      /export const revalidate[^\n]*\n*/,
      (m) => `${m}\n${metaBlock}\n`
    );
  } else {
    content = `${metaBlock}\n${content}`;
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('added metadata:', file);
}

function run() {
  const entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    // Ignore special directories that aren't single-page routes
    if (['api', 'news', 'signin', 'apply', 'admin', 'sitemap', 'sitemap.xml'].includes(slug)) {
      continue;
    }
    addMetadataToFile(slug);
  }
  console.log('Done add-metadata.');
}

run();
