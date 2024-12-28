// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

// Middleware for parsing request bodies
app.use(bodyParser.json()); // For JSON data
app.use(bodyParser.urlencoded({ extended: true })); // For form data

// Serve static files (e.g., your HTML form)
app.use(express.static('public'));

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
connectToMongo();

// Get the database and collection references
const db = client.db('FORM_SUBMISSIONS');
const submissionsCollection = db.collection('submissions');

// Route to handle form submission
app.post('/submit-contact-form', async (req, res) => {
  const formData = req.body;

  // Validate input
  if (!formData['first-name'] || !formData['last-name'] || !formData.email || !formData.question) {
    console.error('Validation failed:', formData);
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Prepare submission data
  const submission = {
    firstName: formData['first-name'],
    lastName: formData['last-name'],
    email: formData.email,
    phoneNumber: formData['phone-number'] || 'N/A',
    relationship: formData.relationship || 'N/A',
    contactMethod: formData['contact-method'] || 'N/A',
    subject: formData.subject || 'General Inquiry',
    question: formData.question,
    consent: formData.consent === 'on',
    createdAt: new Date(),
  };

  try {
    await submissionsCollection.insertOne(submission);
    console.log('Submission saved successfully:', submission);
    res.status(200).json({ redirect: '/redirecting.html' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch submissions for the admin page
app.get('/admin/submissions', async (req, res) => {
  try {
    const submissions = await submissionsCollection.find().toArray();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
