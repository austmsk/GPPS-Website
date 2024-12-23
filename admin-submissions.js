const fs = require('fs');
const path = require('path');
const { decrypt } = require('../encryption');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const filePath = path.resolve('./data.json');

        fs.readFile(filePath, (err, data) => {
            if (err && err.code !== 'ENOENT') {
                return res.status(500).send('Error reading data');
            }

            const submissions = data ? JSON.parse(data) : [];
            const decryptedSubmissions = submissions.map(submission => ({
                firstName: decrypt(submission.firstName),
                lastName: decrypt(submission.lastName),
                email: decrypt(submission.email),
                phoneNumber: decrypt(submission.phoneNumber),
                relationship: submission.relationship,
                contactMethod: submission.contactMethod,
                subject: submission.subject,
                question: decrypt(submission.question),
                consent: submission.consent
            }));

            res.json(decryptedSubmissions);
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
