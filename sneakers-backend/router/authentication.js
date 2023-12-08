const express = require('express');
const authentication= require("../controlers/authentication");
const router = express.Router();

router.use('/register', authentication.register);
router.use('/login', authentication.login);

module.exports = router;