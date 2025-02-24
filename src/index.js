const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username', // replace with your MySQL username
    password: 'your_mysql_password', // replace with your MySQL password
    database: 'applicant_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Save Applicant Endpoint
app.post('/saveApplicant', (req, res) => {
    const { firstName, lastName, pob, dob } = req.body;

    const sql = 'INSERT INTO applicants (first_name, last_name, pob, dob) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, pob, dob], (err, result) => {
        if (err) {
            console.error('Error saving applicant data:', err);
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});