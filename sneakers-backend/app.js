require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const auth = require('./router/authentication');
const api = require('./router/api')
app.use(cors());
app.use(express.json());

// Filter requests and allow CORS
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Authentication
app.use('/auth', auth);
app.use('/api', api);
// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur s\'est produite !');
});


// Export
module.exports = app;