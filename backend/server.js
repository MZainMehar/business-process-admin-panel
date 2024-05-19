const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL Connected...');
});


// Create a user
app.post('/users', (req, res) => {
  const { name, username, password, score } = req.body;
  const sql = 'INSERT INTO users (name, username, password, score) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, username, password, score], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, username, password, score });
  });
});

// Get all users
app.get('/users', (req, res) => {
  const sql = 'SELECT id, name, username, password, score FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, username, password, score } = req.body;
  const sql = 'UPDATE users SET name = ?, username = ?, password = ?, score = ? WHERE id = ?';
  db.query(sql, [name, username, password, score, id], (err, result) => {
    if (err) throw err;
    res.json({ id, name, username, password, score });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Create a job
app.post('/jobs', (req, res) => {
  const { jobName, roomId } = req.body;
  const sql = 'INSERT INTO jobs (jobName, roomId) VALUES (?, ?)';
  db.query(sql, [jobName, roomId], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, jobName, roomId });
  });
});

// Get all jobs
app.get('/jobs', (req, res) => {
  const sql = 'SELECT * FROM jobs';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a job
app.put('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const { jobName, roomId } = req.body;
  const sql = 'UPDATE jobs SET jobName = ?, roomId = ? WHERE id = ?';
  db.query(sql, [jobName, roomId, id], (err, result) => {
    if (err) throw err;
    res.json({ id, jobName, roomId });
  });
});

// Delete a job
app.delete('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM jobs WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Get all room names
app.get('/rooms', (req, res) => {
  const sql = 'SELECT roomName FROM rooms';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all process names
app.get('/processesNames', (req, res) => {
  const sql = 'SELECT name FROM processes';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all Job names
app.get('/jobNames', (req, res) => {
  const sql = 'SELECT jobName FROM jobs';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO tasks (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description });
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Get all tasks
app.get('/taskName', (req, res) => {
  const sql = 'SELECT name FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.json({ id, name, description });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Create a room
app.post('/rooms', (req, res) => {
  const { roomNumber, floorId, roomName, roomDescription } = req.body;
  const sql = 'INSERT INTO rooms (room_number, floor_id, room_name, room_description) VALUES (?, ?, ?, ?)';
  db.query(sql, [roomNumber, floorId, roomName, roomDescription], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, roomNumber, floorId, roomName, roomDescription });
  });
});

// Get all rooms
app.get('/rooms', (req, res) => {
  const sql = 'SELECT * FROM rooms';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a room
app.put('/rooms/:id', (req, res) => {
  const { id } = req.params;
  const { roomNumber, floorId, roomName, roomDescription } = req.body;
  const sql = 'UPDATE rooms SET room_number = ?, floor_id = ?, room_name = ?, room_description = ? WHERE id = ?';
  db.query(sql, [roomNumber, floorId, roomName, roomDescription, id], (err, result) => {
    if (err) throw err;
    res.json({ id, roomNumber, floorId, roomName, roomDescription });
  });
});

// Delete a room
app.delete('/rooms/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM rooms WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});


// Create a function
app.post('/functions', (req, res) => {
  const { name, description, type } = req.body;
  const sql = 'INSERT INTO functions (name, description, type) VALUES (?, ?, ?)';
  db.query(sql, [name, description, type], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description, type });
  });
});

// Get all functions
app.get('/functions', (req, res) => {
  const sql = 'SELECT * FROM functions';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a function
app.put('/functions/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, type } = req.body;
  const sql = 'UPDATE functions SET name = ?, description = ?, type = ? WHERE id = ?';
  db.query(sql, [name, description, type, id], (err, result) => {
    if (err) throw err;
    res.json({ id, name, description, type });
  });
});

// Delete a function
app.delete('/functions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM functions WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));