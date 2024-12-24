export default function handler(req, res) {
  if (req.method === 'POST') {
      const formData = req.body;

      const encryptedData = {
          relationship: formData.relationship,
          firstName: encrypt(formData['first-name']),
          lastName: encrypt(formData['last-name']),
          email: encrypt(formData['email']),
          phoneNumber: encrypt(formData['phone-number']),
          contactMethod: formData['contact-method'],
          subject: formData.subject,
          question: encrypt(formData.question),
          consent: formData.consent
      };

      // Add to temporary in-memory store
      submissions.push(encryptedData);

      // Redirect user to a confirmation page
      res.writeHead(302, { Location: 'redirecting.html' });
      res.end();
  } else {
      res.status(405).send('Method Not Allowed');
  }
}
