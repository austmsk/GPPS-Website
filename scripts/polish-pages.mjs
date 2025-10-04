// scripts/polish-pages.mjs
// Overwrite specific scaffolded pages with clean JSX + metadata (including canonical) and Breadcrumbs.

import fs from 'fs';
import path from 'path';

const APP = 'app';
const SITE = process.env.SITE_URL || 'http://localhost:3000';

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writePage(slug, title, description, bodyJsx, crumbs = []) {
  const dir = path.join(APP, slug);
  const file = path.join(dir, 'page.tsx');
  ensureDir(dir);

  const canonical = `${SITE}/${slug === '' ? '' : slug}`;
  const crumbsArray = JSON.stringify([{ href: '/', label: 'Home' }, ...crumbs], null, 2);

  const content = `import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 86400;

export const metadata = {
  title: '${title}',
  description: \`${description}\`,
  alternates: { canonical: '${canonical}' },
};

export default function Page(): JSX.Element {
  return (
    <section>
      <Breadcrumbs items={${crumbsArray}} />
      ${bodyJsx}
    </section>
  );
}
`;

  fs.writeFileSync(file, content, 'utf8');
  console.log('polished:', file);
}

// Pages to polish
writePage(
  'gpps-statement',
  'GPPS Administration Statement | GPPS',
  'Official administrative statement and guidance for admissions and community updates.',
  `<h1>GPPS Administration Statement</h1>
  <p>
    Find official information and updates from the GPPS administration here. For any questions on admissions,
    documentation, or timelines, please contact our admissions office.
  </p>`,
  [{ href: '/news', label: 'News & Events' }, { href: '/gpps-statement', label: 'Administration Statement' }]
);

writePage(
  'pehf',
  'PEHF | GPPS',
  'PEHF information and forms for parents and guardians.',
  `<h1>PEHF</h1>
  <p>
    Access information related to PEHF. If you need official forms or have questions, please contact our office.
  </p>`,
  [{ href: '/pehf', label: 'PEHF' }]
);

writePage(
  'pps-template',
  'PPS Template | GPPS',
  'Reference template resources related to GPPS.',
  `<h1>PPS Template</h1>
  <p>
    Reference templates and resources used by GPPS will be published on this page. Check back soon for updates.
  </p>`,
  [{ href: '/pps-template', label: 'PPS Template' }]
);

writePage(
  'redirecting',
  'Redirecting | GPPS',
  'This page provides information about recent changes or redirects.',
  `<h1>Redirecting</h1>
  <p>
    The content you are looking for may have moved. Use the navigation or breadcrumbs above to find the next page,
    or return to the home page.
  </p>`,
  [{ href: '/redirecting', label: 'Redirecting' }]
);

// Also add breadcrumbs + canonicals to pages we already cleaned
function updateSimplePage(slug, title, description, h1) {
  writePage(
    slug,
    title,
    description,
    `<h1>${h1}</h1>`,
    [{ href: '/' + slug, label: h1 }]
  );
}

// If you want to re-polish these too, uncomment:
// updateSimplePage('religion', 'Religious Affiliation | GPPS', 'Learn about the religious affiliation and values that guide GPPS in educating and nurturing students.', 'Religious Affiliation');
// updateSimplePage('director-welcome-page', 'Welcome from the Director | GPPS', 'A welcome message from the Director of GPPS.', 'Welcome from the Director');
// updateSimplePage('transportation', 'Transportation | GPPS', 'Information about GPPS transportation options and planning daily commutes.', 'Transportation');

console.log('Done polish-pages.');
