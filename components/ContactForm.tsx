'use client';

import React, { useState } from 'react';

type FormState = {
  'first-name': string;
  'last-name': string;
  email: string;
  'phone-number'?: string;
  relationship?: string;
  'contact-method'?: string;
  subject?: string;
  question: string;
  consent?: boolean | string;
};

export default function ContactForm({ apiPath = '/api/submit-contact-form' }: { apiPath?: string }) {
  const [form, setForm] = useState<FormState>({
    'first-name': '',
    'last-name': '',
    email: '',
    question: '',
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
