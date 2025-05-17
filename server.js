require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Set up the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, confirmPassword, role, rescuerType } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Please fill all required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (role === 'rescuer' && !rescuerType) {
    return res.status(400).json({ error: 'Please select your rescuer type' });
  }

  try {
    // Check if the email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (result.length > 0) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const user = { name, email, password: hashedPassword, role, rescuer_type: rescuerType || null };

      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to register user' });

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
