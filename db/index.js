require('dotenv').config({path: '../env'});

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}