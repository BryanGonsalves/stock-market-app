// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env

const app = express();
app.use(express.json());
app.use(cors());  // Allow cross-origin requests (React app will run on different port)

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Debug: Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Store in .env file

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password encryption failed' });

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error during signup:', err.message);  // Debugging
        return res.status(500).json({ error: 'Database error during signup' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Database error during login:', err.message);
        return res.status(500).json({ error: 'Database error during login', details: err.message }); // Send detailed error
      }
      
      if (results.length === 0) {
        console.error('User not found:', username);
        return res.status(400).json({ error: 'User not found' });
      }
  
      const user = results[0];
  
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err.message);
          return res.status(500).json({ error: 'Error comparing passwords' });
        }
        
        if (!isMatch) {
          console.error('Invalid password for user:', username);
          return res.status(401).json({ error: 'Invalid password' });
        }
  
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username: user.username });
      });
    });
  });
  

// Example of a protected route
app.get('/stocks/:symbols', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Unauthorized' });

  // Verify JWT token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Unauthorized' });

    // Allow access to stocks data if token is valid
    res.json({ message: `Access granted to stocks data for ${req.params.symbols}` });
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
