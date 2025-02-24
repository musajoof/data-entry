import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = 3001;

// CORS Setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gambia_passport_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// Applicant schema and model
const applicantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  pob: { type: String, required: true },
  dob: { type: Date, required: true },
  scannedDocuments: [{
    documentType: String,
    filePath: String,
  }],
}, { timestamps: true });

const Applicant = mongoose.model('Applicant', applicantSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to save applicant data
app.post('/saveApplicant', async (req, res) => {
  try {
    const { firstName, lastName, pob, dob, scannedDocuments = [] } = req.body;

    if (!firstName || !lastName || !pob || !dob) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const applicant = new Applicant({ firstName, lastName, pob, dob, scannedDocuments });
    await applicant.save();

    res.status(201).json({ message: 'Applicant saved successfully.' });
  } catch (error) {
    console.error('❌ Error saving applicant:', error);
    res.status(500).json({ message: 'Server error while saving applicant.' });
  }
});

// Endpoint to search applicants by name or place of birth
app.get('/searchApplicant', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  try {
    const applicants = await Applicant.find({
      $or: [
        { firstName: new RegExp(query, 'i') },
        { lastName: new RegExp(query, 'i') },
        { pob: new RegExp(query, 'i') },
      ],
    });

    res.json(applicants);
  } catch (error) {
    console.error('❌ Error searching applicants:', error);
    res.status(500).json({ message: 'Server error while searching applicants.' });
  }
});

// Start the server using nodemon
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('🔄 Watching for changes with nodemon...');
});
