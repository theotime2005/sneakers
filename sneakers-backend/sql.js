require('dotenv').configDotenv();
const sql = require('mysql2');
const connexion = sql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    port: process.env.SQL_PORT,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
})
connexion.connect()

module.exports = connexion;