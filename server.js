// server.js is the entry point to backend application

require("dotenv").config(); // import environment variables
const express = require("express"); // import express app
const cors = require('cors'); // import cors
const db = require("./db"); // import database access

const app = express(); // create instance of an express app

// middleware
app.use(cors());  // makes it so two different domains (backend & frontend) can talk to each other
app.use(express.json()); // parses request data into req.body object

// define 'Retrieval/Read' route for all todos
// baseURL: http://localhost:4000/api/v1/todos
// (req, res) => {} known as the route handler callback function
app.get("/api/v1/todos", async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM todos');
    res.send(rows);
    console.log('Get all todos.');
  } catch (err) {
    console.error(err.message);
  }
});

// get individual todo
app.get("/api/v1/todos/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM todos WHERE id=$1', [req.params.id]
    );
    console.log('Get a todo.');
    res.send(rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create todo
app.post("/api/v1/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    const results = await db.query(
      'INSERT INTO todos(todo, created_on, complete) VALUES($1, current_timestamp, false) RETURNING *',
      [todo]
    );
    res.send(results.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete todo
app.delete("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM todos WHERE id=$1', [id]);
    res.send('A todo was deleted.');
  } catch (err) {
    console.error(err.message);
  }
});

// update todo
app.put("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const results = await db.query('UPDATE todos SET todo=$1 WHERE id=$2 RETURNING *', [todo, id]);
    res.send(results.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}.`);
});
