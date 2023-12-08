require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = require("./routes/api");

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

// Filter requests and allow CORS
app.use((req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api', router);

// Export
module.exports = app;