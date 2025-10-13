'use client';

import React, { useState } from 'react';

type FormState = {
  'first-name': string;
  'last-name': string;
  email: string;
  'phone-number'?: string;
  relationship?: 'Parent/Guardian' | 'Student' | 'Staff' | 'Other';
  'contact-method'?: 'Email' | 'Phone';
  subject?: string;
  question: string;
  consent?: boolean | string;
  // anti-spam
  middleName?: string; // honeypot: should remain empty
  startedAt?: number; // timestamp to enforce min time-on-form
};

export default function ContactForm({ apiPath = '/api/submit-contact-form' }: { apiPath?: string }) {
  const [form, setForm] = useState<FormState>({
    'first-name': '',
    'last-name': '',
    email: '',
    question: '',
    relationship: undefined,
    'contact-method': undefined,
    middleName: '',
    startedAt: Date.now(),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!form['first-name'] || !form['last-name'] || !form.email || !form.question) {
      setError('Please fill the required fields: first name, last name, email, and question.');
      return;
    }
    // basic human check: at least 3s on form
    if (form.startedAt && Date.now() - form.startedAt < 3000) {
      setError('Please take a moment to complete the form before submitting.');
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
        setMessage(data?.message || 'Submission saved successfully!');
        setForm({
          'first-name': '',
          'last-name': '',
          email: '',
          question: '',
          'phone-number': '',
          relationship: undefined,
          'contact-method': undefined,
          subject: '',
          consent: false,
          middleName: '',
          startedAt: Date.now(),
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
      <div style={{ display: 'grid', gap: 12 }}>
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
          name="phone-number"
          placeholder="Phone number"
          value={form['phone-number'] || ''}
          onChange={e => update('phone-number', e.target.value)}
          style={{ padding: 8 }}
        />

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Relationship to GPPS</label>
            <select
              name="relationship"
              value={form.relationship || ''}
              onChange={e => update('relationship', (e.target.value || undefined) as any)}
              style={{ width: '100%', padding: 8 }}
            >
              <option value="">Select…</option>
              <option value="Parent/Guardian">Parent/Guardian</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Preferred contact method</label>
            <select
              name="contact-method"
              value={form['contact-method'] || ''}
              onChange={e => update('contact-method', (e.target.value || undefined) as any)}
              style={{ width: '100%', padding: 8 }}
            >
              <option value="">Select…</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
        </div>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject || ''}
          onChange={e => update('subject', e.target.value)}
          style={{ padding: 8 }}
        />

        <textarea
          name="question"
          placeholder="Your question *"
          value={form.question}
          onChange={e => update('question', e.target.value)}
          required
          rows={6}
          style={{ padding: 8 }}
        />

        {/* honeypot + timing (hidden) */}
        <input
          name="middleName"
          autoComplete="off"
          tabIndex={-1}
          value={form.middleName || ''}
          onChange={e => update('middleName', e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
        <input type="hidden" name="startedAt" value={form.startedAt || Date.now()} />

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={form.consent === true || form.consent === 'on'}
            onChange={e => update('consent', e.target.checked ? true : false)}
          />
          <span style={{ fontSize: 14 }}>I consent to having this website store my submitted information.</span>
        </label>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        {message && <div style={{ color: 'green' }}>{message}</div>}

        <div>
          <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}
