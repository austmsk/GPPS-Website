/**
 * lib/rateLimit.ts
 * Basic in-memory IP rate limiter for serverless/edge routes.
 * NOTE: Resets when the process restarts. Good enough to deter bursts.
 */

type Bucket = {
  hits: number[];
};

const windowMsDefault = 10 * 60 * 1000; // 10 minutes
const limitDefault = 5; // 5 requests per window
const buckets = new Map<string, Bucket>();

export function allow(ip: string, limit = limitDefault, windowMs = windowMsDefault): boolean {
  const now = Date.now();
  const b = buckets.get(ip) ?? { hits: [] };

  // prune old
  b.hits = b.hits.filter((t) => now - t < windowMs);

  if (b.hits.length >= limit) {
    buckets.set(ip, b);
    return false;
  }

  b.hits.push(now);
  buckets.set(ip, b);
  return true;
}

/**
 * Utility to best-effort get client IP from headers.
 */
export function getClientIpFromHeaders(headers: Headers): string {
  const xff = headers.get('x-forwarded-for') || headers.get('x-real-ip');
  if (xff) {
    // Use first IP in the list
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }
  return 'unknown';
}
