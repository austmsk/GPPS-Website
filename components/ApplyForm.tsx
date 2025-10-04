'use client';

import React, { useState } from 'react';

type ApplyFormState = {
  'first-name': string;
  'last-name': string;
  email: string;
  phone?: string;
  'grade-applying-for'?: string;
  'previous-school'?: string;
  'parent-name'?: string;
  'parent-contact'?: string;
  subject?: string;
  message: string;
  consent?: boolean | string;
  honeypot?: string;
};

export default function ApplyForm({ apiPath = '/api/submit-apply' }: { apiPath?: string }) {
  const [form, setForm] = useState<ApplyFormState>({
    'first-name': '',
    'last-name': '',
    email: '',
    message: '',
    'honeypot': '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function update<K extends keyof ApplyFormState>(key: K, value: ApplyFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Honeypot check
    if (form.honeypot && form.honeypot.trim().length > 0) {
      setError('Spam detected');
      return;
    }

    if (!form['first-name'] || !form['last-name'] || !form.email || !form.message) {
      setError('Please fill required fields: first name, last name, email and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Submission failed');
      } else {
        setSuccess(data?.message || 'Application submitted successfully!');
        setForm({
          'first-name': '',
          'last-name': '',
          email: '',
          message: '',
          'honeypot': '',
        });
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      <div style={{ display: 'grid', gap: 12 }}>
        {/* Honeypot - hidden from users */}
        <input
          name="honeypot"
          value={form.honeypot || ''}
          onChange={e => update('honeypot', e.target.value)}
          style={{ display: 'none' }}
          autoComplete="off"
        />

        <div style={{ display: 'flex', gap: 12 }}>
          <input
            name="first-name"
            placeholder="First name *"
            value={form['first-name']}
            onChange={e => update('first-name', e.target.value)}
            required
            style={{ flex: 1, padding: 8 }}
          />
          <input
            name="last-name"
            placeholder="Last name *"
            value={form['last-name']}
            onChange={e => update('last-name', e.target.value)}
            required
            style={{ flex: 1, padding: 8 }}
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={e => update('email', e.target.value)}
          required
          style={{ padding: 8 }}
        />

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone || ''}
          onChange={e => update('phone', e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          name="grade-applying-for"
          placeholder="Grade applying for"
          value={form['grade-applying-for'] || ''}
          onChange={e => update('grade-applying-for', e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          name="previous-school"
          placeholder="Previous school (if any)"
          value={form['previous-school'] || ''}
          onChange={e => update('previous-school', e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          name="parent-name"
          placeholder="Parent/Guardian name"
          value={form['parent-name'] || ''}
          onChange={e => update('parent-name', e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          name="parent-contact"
          placeholder="Parent/Guardian contact"
          value={form['parent-contact'] || ''}
          onChange={e => update('parent-contact', e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject || ''}
          onChange={e => update('subject', e.target.value)}
          style={{ padding: 8 }}
        />

        <textarea
          name="message"
          placeholder="Your message / statement *"
          value={form.message}
          onChange={e => update('message', e.target.value)}
          required
          rows={8}
          style={{ padding: 8 }}
        />

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={form.consent === true || form.consent === 'on'}
            onChange={e => update('consent', e.target.checked ? true : false)}
          />
          <span style={{ fontSize: 14 }}>I consent to having this website store my submitted information.</span>
        </label>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}

        <div>
          <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </div>
    </form>
  );
}
