const jwt = require("jsonwebtoken");
modules.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, token_characters);
        const user_id = decodedToken.user_id;
        req.auth = {
            user_id: user_id
        }
        next();
    } catch (error) {
        res.status(401).json({error});
    }
}