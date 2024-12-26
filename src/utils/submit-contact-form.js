const { encrypt } = require('./encryption'); // Import the encryption function

const submissions = []; // Temporary in-memory storage

export default function handler(req, res) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Validate input data
        if (!formData['first-name'] || !formData['last-name'] || !formData.email || !formData.question) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Encrypt sensitive fields
        const encryptedData = {
            relationship: formData.relationship,
            firstName: encrypt(formData['first-name']),
            lastName: encrypt(formData['last-name']),
            email: encrypt(formData['email']),
            phoneNumber: encrypt(formData['phone-number'] || ''), // Optional
            contactMethod: formData['contact-method'],
            subject: formData.subject,
            question: encrypt(formData.question),
            consent: formData.consent,
        };

        // Save encrypted data
        submissions.push(encryptedData);

        // Respond with a redirect URL
        return res.status(200).json({ redirect: 'redirecting.html' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
