const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_CHARACTERS);
        const user_id = decodedToken.user_id;
        req.auth = {
            user_id: user_id
        }
        next();
    } catch (error) {
        res.status(401).json({message: "Error during the authentification", details: {error: error}});
    }
}