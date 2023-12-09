require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./router/authentication');
const api = require('./router/api')
app.use(express.json());

// Filter requests and allow CORS
app.use('/', (req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Authentication
app.use('/api/auth', auth);
app.use('/api', api);

// Export
module.exports = app;