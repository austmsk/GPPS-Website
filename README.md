# GPPS Website (Next.js 14 App Router)

Production-ready configuration for deployment on Vercel.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- NextAuth (Credentials provider)
- MongoDB (Serverless-friendly connection helper)
- MD/MDX content in `content/news`
- SMTP email (falls back to console logging if SMTP not configured)

## Local Development
1) Copy env template and fill values

   cp .env.example .env.local
   # Edit .env.local

   Required variables (see .env.example for the full list):
   - NEXTAUTH_URL=http://localhost:3000
   - NEXTAUTH_SECRET=your_random_secret
   - ADMIN_EMAIL=...
   - ADMIN_PASSWORD=...
   - MONGODB_URI=...
   - (Optional email) SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_FROM, NOTIFY_TO
   - REVALIDATE_SECRET=...
   - SITE_URL=http://localhost:3000

2) Install deps and run dev server

   npm install
   npm run dev

3) Build & preview production

   npm run build
   npm start

## Deploying to Vercel
Vercel auto-detects Next.js projects; no custom vercel.json is used (removed).

1) Connect repo to Vercel (Vercel dashboard → New Project)
2) Configure Environment Variables (Production & Preview)
   - NEXTAUTH_URL=https://your-domain.example (or Vercel-provided URL)
   - NEXTAUTH_SECRET=your_random_secret
   - ADMIN_EMAIL, ADMIN_PASSWORD
   - MONGODB_URI
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (optional)
   - NOTIFY_FROM, NOTIFY_TO (optional)
   - REVALIDATE_SECRET
   - SITE_URL=https://your-domain.example
3) Deploy

### Post-deploy checks
- /signin works (use ADMIN_EMAIL/ADMIN_PASSWORD)
- APIs:
  - POST /api/submit-apply
  - POST /api/submit-contact-form
  - GET /api/admin/submissions
  - POST /api/admin/submissions/[id]/reply
  - POST /api/revalidate with body { secret, path }
- /sitemap returns XML

## On-Demand Revalidation
POST /api/revalidate
Body: { "secret": REVALIDATE_SECRET, "path": "/some/path" }
This triggers `revalidatePath(path)`.

## Caching & Performance
Static assets receive long-lived immutable cache headers via next.config.mjs:
- Cache-Control: public, max-age=31536000, immutable

## Notes
- Route handlers and file-system reads run on Node.js runtime (default on Vercel for route handlers). No edge runtime required.
- Legacy `src/api/*` endpoints are not used by this Next.js App Router project. Prefer `app/api/*`.
