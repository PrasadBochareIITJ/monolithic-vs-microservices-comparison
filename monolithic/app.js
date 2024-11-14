const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',               // Replace with your MySQL username, e.g., 'root'
  password: 'Lamha@2023',    // Replace with your MySQL password
  database: 'test_db'          // Replace with the name of your database
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Route to create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting user');
      return;
    }
    res.send(`User added with ID: ${result.insertId}`);
  });
});

// Route to retrieve all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving users');
      return;
    }
    res.json(results);
  });
});

// Route to update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating user');
      return;
    }
    res.send(`User with ID: ${id} updated`);
  });
});

// Route to delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.send(`User with ID: ${id} deleted`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
