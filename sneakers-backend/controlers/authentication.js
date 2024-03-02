const crypt = require("bcrypt");
const sql = require('../sql');
const jwt = require('jsonwebtoken');
const email = require('../mail');

exports.register = async (req, res, send) => {
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
                    const mailOption = {
                        from: "Le site des sneakers",
                        to: req.body.email,
                        subject: "Confirmation d'inscription",
                        html: `
                        <h1>Confirmation d'inscription</h1>
                        <p>Bonjour ${req.body.username}. Votre compte a été créé avec succès.</p>
                        <p>Vous pouvez désormais vous connecter sur <a href="http://localhost:5173">Notre site</a> et commencer votre collection!</p>
                        <p>A très bientôt</p>
                        <p>Théotime Berthod</p>
                        <footer>
                        <p>Il s'agit d'un email automatique, merci de ne pas y répondre</p>
                        <p>Copyright © Théotime Berthod</p>
</footer>
                        `
                    }
                    email.sendMail(mailOption, (mail_error, mail_info) => {
                        if (mail_error) {
                            console.error(mail_error);
                        } else {
                            console.log("Mail sended", mail_info.response);
                        }
                    })
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
        return;
    }
    const mySqlRequest = 'SELECT * FROM Users WHERE email = "'+req.body.email+'";';
    sql.query(mySqlRequest, async (err, rows, fields) => {
        if (err) {
            res.status(401).send("Unable to check data in the server");
        }
        if (rows) {
            const data = rows[0];
            const test_password = await crypt.compare(req.body.password, data.password);
            if (test_password) {
                res.status(200).json({
                    id: data.id,
                    userName: data.username,
                    token: jwt.sign({user_id: data.id}, process.env.TOKEN_CHARACTERS, {expiresIn: '1h'}),
                    username: req.body.username
                })
            } else {
                return res.status(403).json({message: "Incorrect password"});
            }
        }
    })
}

exports.resetPassword = async (req, res, next) => {
    try {
        const mySqlRequest = `SELECT * FROM Users WHERE email = "${req.body.email}"`;
        sql.query(mySqlRequest, (err, rows, fields) => {
            if (err) {
                return res.status(404).json({message: "Error with the database.", error: err})
            }
            if (rows) {
                const data = rows[0];
                const token = jwt.sign({user_id: data.id, user_name: data.username}, process.env.TOKEN_CHARACTERS, {expiresIn: '1h'});
                const mailOption = {
                    to: req.body.email,
                    from: process.env.EMAIL_ADRESS,
                    subject: "Réinitialisation de votre mot de passe",
                    html: `
                <h1>Réinitialisation de votre mot de passe</h1>
                <p>Bonjour ${data.username}. Vous avez demandé la réinitialisation de votre mot de passe. Cliquer sur le lien ci-dessous pour le réinitialiser.</p>
                <a href="http://localhost:5173/auth/reset?token=${encodeURIComponent(token)}">Réinitialiser mon mot de passe</a>
                <p>Ce lien sera valable durant 24h.</p>
                `
                };
                email.sendMail(mailOption, (mail_error, mail_info) => {
                    if (mail_error) {
                        console.error(mail_error);
                    }
                    console.log(mail_info);
                })
            }
            return res.status(200).json({message: "token send"});
        })
    } catch (error) {
        console.error(error);
    }
}

exports.check_token = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_CHARACTERS);
        return res.status(200).json({isValid: true});
    } catch (error) {
        console.error(error)
        res.status(403).json({isValid: false});
    }
}

exports.changePassword = async (req, res) => {
    try {
        const newPassword = await crypt.hash(req.body.password, 10);
        const mySqlRequest = `UPDATE Users SET password = "${newPassword}" WHERE id = ${req.auth.user_id};`;
        sql.query(mySqlRequest, (err, rows, fields) => {
            if (err) {
                return status(501).json({message: "Internal server error", error: err})
            }
            return res.status(200).json({message: "User modified"});
        })
    } catch (error) {
        console.error(error);
        return res.status(501).json({message: "Internal server error", error: error});
    }
}