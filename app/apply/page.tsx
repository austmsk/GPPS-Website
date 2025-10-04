export const revalidate = 86400; // 24h

import ApplyForm from '../../components/ApplyForm';

export default function ApplyPage() {
  return (
    <section>
      <h1>Apply to GPPS</h1>
      <p>Please complete the application form below. Required fields are marked with *</p>

      <div style={{ marginTop: 20 }}>
        <ApplyForm />
      </div>
    </section>
  );
}
