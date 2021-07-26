const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const questions = require('./index.js');
 
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'secretpass',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Query database
db.query(questions, function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});