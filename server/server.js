const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Evr!bsap', // your password
  database: 'db_users_gr', // your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
        } else {
            const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            const values = [username, email, hashedPassword];

            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error('Error registering user:', err);
                    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
                } else {
                    res.status(201).json({ success: true, message: 'User registered successfully' });
                }
            });
        }
    });
});


// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                const hashedPassword = user.password;

                // Compare the entered password with the hashed password in the database
                bcrypt.compare(password, hashedPassword, (compareErr, match) => {
                    if (compareErr) {
                        console.error('Error comparing passwords:', compareErr);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        if (match) {
                            res.status(200).json({ success: true, message: 'Login successful', user });
                        } else {
                            res.status(401).json({ success: false, error: 'Invalid credentials' });
                        }
                    }
                });
            } else {
                res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
