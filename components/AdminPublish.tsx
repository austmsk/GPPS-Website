'use client';

import React, { useState } from 'react';

export default function AdminPublish({ slug }: { slug: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`Error: ${data?.error || res.status}`);
      } else {
        setStatus(`Published & revalidated: ${data?.message || 'ok'}`);
      }
    } catch (err) {
      setStatus(`Network error`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={handlePublish} disabled={loading} style={{ padding: '6px 10px' }}>
        {loading ? 'Publishing…' : 'Publish & Revalidate'}
      </button>
      {status && <small style={{ color: status.startsWith('Error') ? 'crimson' : 'green' }}>{status}</small>}
    </div>
  );
}
