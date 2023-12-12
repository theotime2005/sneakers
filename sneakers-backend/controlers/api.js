const sql = require('../sql');

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
            return res.status(403).json({message: "Empty collection"});
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
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            return res.status(501).json({message: "Internal servor error", details: {error: err}})
        }
        res.status(200).json({message: "Sneaker added"});
    })
}

exports.displayWishList = async (req, res, next) => {
    const mySqlRequest = `SELECT * FROM WishList WHERE user_id = ${req.params.id};`;
    sql.query(mySqlRequest, (err, rows, fields) => {
        if (err) {
            res.status(501).json({message: "Internal server error", details: {error: err}});
        }
        if (rows.length===0) {
            return res.status(403).json({message: "Wish list is empty", total: rows.length});
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