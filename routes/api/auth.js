const express = require('express');
const router = express.Router();
const { userSchema } = require('../../schemas/auth');
const { checkUser } = require('../../middlewares/index');
const { login, signup } = require('../../controller/authController');

router.post('/signup', checkUser(userSchema), signup);

router.post('/login', login);


module.exports = router;
