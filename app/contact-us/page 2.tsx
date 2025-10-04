export const revalidate = 86400; // 24 hours

import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <section>
      <h1>Contact Us</h1>
      <p>If you have questions, use the form below and we'll get back to you.</p>

      <div style={{ marginTop: 20 }}>
        <ContactForm apiPath="/api/submit-contact-form" />
      </div>
    </section>
  );
}
