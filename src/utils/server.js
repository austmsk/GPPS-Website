require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryption');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use('/pps-styles', express.static(path.join(__dirname, '..', 'pps-styles')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use('/js', express.static(path.join(__dirname, '..', 'utils')));
app.use(express.static(path.join(__dirname, '..')));


const sanitize = (str) => str.replace(/[<>\\/]/g, '');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'contact-us.html'));
});

app.post('/submit_contact_form', (req, res) => {
    const formData = req.body;

    if (!formData['first-name'] || !formData['last-name'] || !formData.email || !formData.question) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const encryptedData = {
        relationship: sanitize(formData.relationship),
        firstName: encrypt(sanitize(formData['first-name'])),
        lastName: encrypt(sanitize(formData['last-name'])),
        email: encrypt(sanitize(formData['email'])),
        phoneNumber: encrypt(sanitize(formData['phone-number'] || '')),
        contactMethod: sanitize(formData['contact-method']),
        subject: sanitize(formData.subject),
        question: encrypt(sanitize(formData.question)),
        consent: sanitize(formData.consent),
    };

    fs.readFile(path.join(__dirname, '..', 'data.json'), (err, data) => {
        const existingData = err && err.code === 'ENOENT' ? [] : JSON.parse(data || '[]');
        existingData.push(encryptedData);

        fs.writeFile(path.join(__dirname, '..', 'data.json'), JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Data saved successfully.');
            res.status(200).json({ redirect: 'redirecting.html' });
        });
    });
});

app.get('/admin/submissions', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'data.json'), (err, data) => {
        const submissions = err && err.code === 'ENOENT' ? [] : JSON.parse(data || '[]');
        const decryptedSubmissions = submissions.map((submission) => ({
            firstName: decrypt(submission.firstName),
            lastName: decrypt(submission.lastName),
            email: decrypt(submission.email),
            phoneNumber: decrypt(submission.phoneNumber),
            relationship: submission.relationship,
            contactMethod: submission.contactMethod,
            subject: submission.subject,
            question: decrypt(submission.question),
            consent: submission.consent,
        }));
        res.json(decryptedSubmissions);
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
