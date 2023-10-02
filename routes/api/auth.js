const express = require('express');
const router = express.Router();
const { userSchema, updateSubscriptionSchema } = require('../../schemas/auth');
const { checkUser, checkUserLogin, protect, validateData } = require('../../middlewares/index');
const { login, signup, getCurrent, logout, updateUserSubscription } = require('../../controller/authController');

router.post('/register', checkUser(userSchema), signup);

router.post('/login', checkUserLogin(userSchema), login);

router.get('/current', protect, getCurrent)

router.post('/logout', protect, logout)

router.patch('/', protect, validateData(updateSubscriptionSchema), updateUserSubscription);

module.exports = router;
