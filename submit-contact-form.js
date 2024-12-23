const fs = require('fs');
const { encrypt } = require('../encryption');

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

        fs.readFile('data.json', (err, data) => {
            const existingData = data ? JSON.parse(data) : [];
            existingData.push(encryptedData);

            fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Internal server error');
                }
                res.send('Form submitted successfully and data encrypted');
            });
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
