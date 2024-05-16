// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
