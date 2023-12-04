require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
app.use(express.json());

// Connexion to the database
const connexion = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    port: process.env.SQL_PORT,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
})

connexion.connect()

// Insert code here

// Export
module.exports = app;