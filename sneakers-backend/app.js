require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./router/authentication');

// Filter requests and allow CORS
app.use((req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// Authentication
app.use('/api/auth', auth);
// Export
module.exports = app;