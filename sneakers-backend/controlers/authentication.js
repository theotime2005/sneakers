const crypt = require("bcrypt");
const sql = require('../sql');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, send) => {
    console.log("Ajout en cours...");
    try {
        const password = await crypt.hash(req.body.password, 10);
        if (req.body.email.indexOf("@") > 0 && req.body.password.length >= 8 && req.body.username.length>0) {
            let mySqlRequest = "INSERT INTO Users (email, username, password, role_id) VALUES (";
            mySqlRequest += "'" + req.body.email + "', ";
            mySqlRequest += "'" + req.body.username + "', ";
            mySqlRequest += "'" + password + "', ";
            mySqlRequest+="1);";
            sql.query(mySqlRequest, (err, rows, fields) => {
                if (err) {
                    return res.status(501).json({message: "Failed to add user", error: {err}});
                } else {
                    res.status(200).json({message: "User added successfull"});
                }
            });
        } else {
            res.status(400).send("Invalid json format error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send('Invalid json format error. Format: ' +
            '{"email": "string", "password": "string"}');
        return
    }
    const mySqlRequest = 'SELECT * FROM Users WHERE email = "'+req.body.email+'";';
    sql.query(mySqlRequest, async (err, rows, fields) => {
        if (err) {
            res.status(401).send("Unable to check data in the server");
        }
        if (rows) {
            const data = rows[0];
            if (crypt.compare(req.body.password, data.password)) {
                res.status(200).json({
                    id: data.id,
                    token: jwt.sign({user_id: data.id}, process.env.TOKEN_CHARACTERS, {expiresIn: '1h'}),
                    username: req.body.username
                })
            }
        }
    })
}
