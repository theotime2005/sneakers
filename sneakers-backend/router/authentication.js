const express = require('express');
const authentication= require("../controlers/authentication");
const auth = require('../midlewhere/authentication');
const router = express.Router();

router.use('/register', authentication.register);
router.use('/login', authentication.login);
router.post('/reset', authentication.resetPassword);
router.get('/reset', authentication.check_token);
router.put('/change-password', auth, authentication.changePassword);

module.exports = router;