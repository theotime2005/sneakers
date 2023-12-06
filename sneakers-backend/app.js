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

// Filter requests and allow CORS
app.use((req, res, next) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
app.post('/api/login', (req, res) => {
    const body = req.body;
    if (typeof body.email===undefined && typeof body.password === undefined) {
        res.status(401);
        res.send("Invalid format error.");
        return;
    }
    const mySqlRequest = "SELECT * FROM Users WHERE email = "+`"${body.email}" AND password = "${body.password}";`;
    res.send(mySqlRequest);
})

app.get('/api/sneakers', (req, res) => {
    const sqlRequest = "SELECT * FROM Sneakers;";
    connexion.query(sqlRequest, (err, rows, fields) => {
        if (err) {
            console.error(err);
            return
        }
        res.send(rows);
    })
})

app.post('/api/sneakers', (req, res) => {
    const body = req.body;
    if (typeof body.UID==="undefined") {
        body['UID']=body.name.replace(" ","-");
    }
    let mySqlRequest = "INSERT INTO Sneakers (";
    const key = Object.keys(body);
    const value = Object.values(body);
    for (let i = 0; i < key.length; i++) {
        mySqlRequest += `${key[i]}, `;
    }
    mySqlRequest = mySqlRequest.slice(0, -2);
    mySqlRequest += ") VALUES (";
    for (let i = 0; i < value.length; i++) {
        mySqlRequest += `'${value[i]}', `;
    }
    mySqlRequest = mySqlRequest.slice(0, -2);
    mySqlRequest += ");";
    connexion.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.send(mySqlRequest);
        }
        res.status(200);
        res.send(body);

    })
})

app.get('/api/sneakers/:id', (req, res) => {
    const id = req.params.id;
    const mySqlRequest=`SELECT * FROM Sneakers WHERE id = ${id};`;
    connexion.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(403);
            res.send(mySqlRequest);
        }
        res.send(rows);
    })
})

app.delete('/api/sneakers/:id', (req, res) => {
    const id = req.params.id;
    const mySqlRequest = `DELETE * FROM Sneakers WHERE id = ${id};`;
    connexion.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(403);
            console.error(err);
            res.send("Id not found");
        }
        res.send("Sneaker deleted");
    })
})

app.put('/api/sneakers/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    let mySqlRequest = "UPDATE Sneakers SET ";
    for ([key, value] of Object.entries(body)) {
        mySqlRequest+=key+" = '"+value+"', ";
    }
    mySqlRequest=mySqlRequest.slice(0, -2)+";";
    connexion.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(501);
            res.send("Internal error");
        }
        res.status(200);
        res.send("Sneaker modified.");
    })
})

// Export
module.exports = app;