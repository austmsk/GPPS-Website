// scripts/scaffold-html-to-tsx.mjs
// Scaffolds src/*.html into app/<slug>/page.tsx using a safe initial wrapper.
// Skips routes already implemented or handled elsewhere.

import fs from 'fs';
import path from 'path';

const SRC_DIR = 'src';
const APP_DIR = 'app';

// Map of filename (without .html) -> directive
// - 'skip' means do not scaffold (already implemented or replaced by MDX/news system)
// - a string means override target route slug
const special = new Map(Object.entries({
  'home-page': 'skip',               // app/page.tsx exists
  'apply': 'skip',                   // app/apply/page.tsx exists
  'contact-us': 'skip',              // app/contact-us/page.tsx exists
  'news-events': 'skip',             // handled by /news
  'new-events-template': 'skip',     // handled by /news
  'Speech-Day-Article': 'skip',      // handled by MDX articles
  'admin': 'skip',                   // app/admin exists
  'GPPS-Statement': 'gpps-statement',
  'Religon': 'religion'              // fix typo/slug
}));

function normalizeSlug(name) {
  const override = special.get(name);
  if (override === 'skip') return null;
  if (typeof override === 'string') return override;

  // Default normalization: lowercase, keep existing hyphens
  return name.toLowerCase();
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function scaffoldHtmlToTsx(file) {
  const base = path.basename(file, '.html');
  const slug = normalizeSlug(base);
  if (!slug) {
    console.log(`skip (special): ${file}`);
    return;
  }

  const targetDir = path.join(APP_DIR, slug);
  const targetFile = path.join(targetDir, 'page.tsx');

  if (fs.existsSync(targetFile)) {
    console.log(`skip (exists): ${targetFile}`);
    return;
  }

  const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

  // Minimal TSX page that renders the original HTML (to be refactored later)
  const tsx = `export const revalidate = 86400;

export default function Page(): JSX.Element {
  return (
    <main dangerouslySetInnerHTML={{ __html: ${JSON.stringify(html)} }} />
  );
}
`;

  ensureDir(targetDir);
  fs.writeFileSync(targetFile, tsx, 'utf8');
  console.log(`wrote: ${targetFile}`);
}

function run() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Missing ${SRC_DIR}/ directory`);
    process.exit(1);
  }

  const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html'));
  if (files.length === 0) {
    console.log('No .html files found in src/');
    return;
  }

  for (const f of files) {
    scaffoldHtmlToTsx(f);
  }

  console.log('Done scaffold.');
}

run();
