const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryption');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like CSS
app.use('/pps-styles', express.static(path.join(__dirname, 'pps-styles')));

// Serve the contact form as the default file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact-us.html'));
});

// Route to handle form submission
app.post('/submit_contact_form', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);

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

    // Read the existing data
    fs.readFile('data.json', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error');
        }

        const existingData = data ? JSON.parse(data) : [];

        // Add new form data to the existing data
        existingData.push(encryptedData);

        // Write the updated data back to the file
        fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal server error');
            }
            console.log('Data saved successfully.');
            res.send('Form submitted successfully and data encrypted');
        });
    });
});

// Route to get all form submissions (for admin)
app.get('/admin/submissions', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error');
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

        console.log('Sending decrypted data:', decryptedSubmissions); // Log the data before sending
        res.json(decryptedSubmissions);
    });
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
