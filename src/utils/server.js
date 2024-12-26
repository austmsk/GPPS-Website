require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryption'); // Encryption module stays in utils

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like CSS
app.use('/pps-styles', express.static(path.join(__dirname, '..', 'pps-styles')));

// Sanitize inputs
const sanitize = (str) => str.replace(/[<>\\/]/g, '');

// Serve the contact form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'contact-us.html'));
});

// Handle form submissions
app.post('/submit_contact_form', (req, res) => {
    const formData = req.body;

    if (!formData['first-name'] || !formData['last-name'] || !formData.email || !formData.question) {
        return res.status(400).send('Missing required fields.');
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
                return res.status(500).send('Internal server error');
            }
            console.log('Data saved successfully.');
            res.send('Form submitted successfully and data encrypted');
        });
    });
});

// Admin routes
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
