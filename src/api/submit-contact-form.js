import { encrypt } from '../../utils/encryption';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Validate input data
        if (!formData['first-name'] || !formData['last-name'] || !formData.email || !formData.question) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Encrypt sensitive fields
        const encryptedData = {
            relationship: formData.relationship,
            firstName: encrypt(formData['first-name']),
            lastName: encrypt(formData['last-name']),
            email: encrypt(formData['email']),
            phoneNumber: encrypt(formData['phone-number'] || ''),
            contactMethod: formData['contact-method'],
            subject: formData.subject,
            question: encrypt(formData.question),
            consent: formData.consent,
        };

        // Save encrypted data to a JSON file
        const filePath = path.join(process.cwd(), 'data.json');
        let existingData = [];

        try {
            if (fs.existsSync(filePath)) {
                const fileContents = fs.readFileSync(filePath);
                existingData = JSON.parse(fileContents);
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }

        existingData.push(encryptedData);

        try {
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
            return res.status(200).json({ redirect: '/redirecting.html' });
        } catch (error) {
            console.error('Error writing file:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method Not Allowed');
    }
}
