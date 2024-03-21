const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Connect to MongoDB (make sure to replace 'your_connection_string' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a MongoDB model for the Applicant
const Applicant = mongoose.model('Applicant', {
  firstName: String,
  lastName: String,
  // Add other fields as needed
});

app.use(bodyParser.json());
app.use(cors());

// Endpoint for handling the upload from React
app.post('/upload', async (req, res) => {
  const { firstName, lastName, documentType } = req.body;

  // Perform the necessary processing for documentType (Indexes, ID Documents, etc.)

  // Respond with success
  res.status(200).send('Document scanned and uploaded successfully');
});

// Endpoint for saving the applicant data to MongoDB
app.post('/saveApplicant', async (req, res) => {
  const { firstName, lastName } = req.body;

  // Save the applicant data to MongoDB
  const applicant = new Applicant({
    firstName,
    lastName,
    // Add other fields as needed
  });

  try {
    await applicant.save();
    res.status(200).send('Applicant data saved successfully');
  } catch (error) {
    console.error('Error saving applicant data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
