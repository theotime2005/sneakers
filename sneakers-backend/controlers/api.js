const sql = require('../sql');
const crypt = require('bcrypt');

// collection
exports.addToCollection = (req, res, next) => {
    let mySqlRequest =  "INSERT INTO Collections VALUES ("+req.auth.user_id+", "+req.body.sneaker_id+");";
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        // Delete on the WishList
        mySqlRequest = `DELETE FROM WishList WHERE user_id = ${req.auth.user_id} AND sneaker_id = ${req.body.sneaker_id};`;
        sql.query(mySqlRequest, (err, rows, fields) => {
            if (err) {
                return res.status(501).json({message: "Internal servor error", details: {error: err}})
            }
        })
        res.status(200).json({message: "Sneaker save in collection"});
    })
}

exports.displayCollection = (req, res, next) => {
    const mySqlRequest = `SELECT * FROM Collections WHERE user_id = ${req.auth.user_id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        if (rows.length===0) {
            return res.status(200).json({message: "Empty collection", total: rows.length});
        }
        res.status(200).json({data: rows, total: rows.length});
    })
}

exports.deleteToCollection = (req, res, next) => {
    const mySqlRequest = `DELETE FROM Collections WHERE user_id = ${req.auth.user_id} AND sneaker_id = ${req.params.id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal servor error", details: {error: err}})
        }
      res.status(200).send("Sneaker deleted");
    })
}

// wishList
exports.addToWishList = (req, res, next) => {
    let mySqlRequest =  "INSERT INTO WishList VALUES ("+req.auth.user_id+", "+req.body.sneaker_id+");";
    console.log(mySqlRequest);
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal servor error", details: {error: err}})
        }
        res.status(200).json({message: "Sneaker added"});
    })
}

exports.displayWishList = async (req, res, next) => {
    const mySqlRequest = `SELECT * FROM WishList WHERE user_id = ${req.auth.user_id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        if (rows.length===0) {
            return res.status(200).json({message: "Wish list is empty", total: rows.length});
        }
        res.status(200).json({data: rows, total: rows.length});
    })
}

exports.deleteToWishList = (req, res, next) => {
    const mySqlRequest = `DELETE FROM WishList WHERE user_id = ${req.auth.user_id} AND sneaker_id = ${req.params.id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal servor error", details: {error: err}})
        }
        res.status(200).send("Sneaker deleted");
    })
}

// Profil
exports.getProfilInformation = (req, res, next) => {
    const mySqlRequest = `SELECT * FROM USERS WHERE id = ${req.auth.user_id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(501).json({"message": "Internal server error", details: {error: err}});
        }
        res.status(200).json({data: rows})
    })
}

exports.updateProfil = (req,res, next) => {
    let mySqlRequest = "UPDATE Users SET email = '"+req.body.email+"', username = '"+req.body.username+`' WHERE id = ${req.auth.user_id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        res.status(200).json({message: "Profil has modified"})
    })
}

exports.deleteProfil = (req, res, nnext) => {
    sql.query(`DELETE FROM WishList WHERE user_id = ${req.auth.user_id};`, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        sql.query(`DELETE FROM Collections WHERE user_id = ${req.auth.user_id};`, (err, rows, fields) => {
            if (err) {
                return res.status(501).json({message: "Internal server error", details: {error: err}});
            }
            sql.query(`DELETE FROM Users WHERE id = ${req.auth.user_id};`, (err, rows, fields) => {
                if (err) {
                    return res.status(501).json({message: "Internal server error", details: {error: err}});
                }
                return res.status(200).json({message: "User deleted"});
            })
        })
    })
}

exports.changePassword = async (req, res, next) => {
    try {
        const newPassword = await crypt.hash(req.body.newPassword, 10);
        let mySqlRequest = `SELECT password FROM Users WHERE id = ${req.auth.user_id};`;
        sql.query(mySqlRequest, async (err, rows, fields) => {
            if (err) {
                res.status(501).json({message: "Internal server error", details: {error: err}});
            }
            const test_password = await crypt.compare(req.body.previousPassword, rows[0].password);
            if (test_password) {
                mySqlRequest = `UPDATE Users SET password = "${newPassword}" WHERE id = ${req.auth.user_id};`;
                sql.query(mySqlRequest, (err, rows, fields) => {
                    if (err) {
                        res.status(501).json({message: "Internal server error", details: {error: err}});
                    }
                    res.status(200).json({message: "Password has modified."});
                })
            } else {
                return res.status(403).json({message: "Incorrect previous password"});
            }
        })
    } catch (error) {

    }
}