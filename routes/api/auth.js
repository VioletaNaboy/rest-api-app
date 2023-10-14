const express = require('express');
const router = express.Router();
const { userSchema, updateSubscriptionSchema, userVerifySchema } = require('../../schemas/auth');
const { checkUser, checkUserLogin, checkUserVerification, protect, validateData, uploadUserAvatar } = require('../../middlewares/index');
const { login, signup, verifyEmail, verifyEmailRequest, getCurrent, logout, updateUserSubscription, updateAvatar } = require('../../controller/authController');

router.post('/register', checkUser(userSchema), signup);

router.post('/login', checkUserLogin(userSchema), login);

router.get('/verify/:verificationToken',  verifyEmail)

router.post('/verify/', checkUserVerification(userVerifySchema), verifyEmailRequest)

router.get('/current', protect, getCurrent)

router.patch('/avatars', protect, uploadUserAvatar, updateAvatar)

router.post('/logout', protect, logout)

router.patch('/', protect, validateData(updateSubscriptionSchema), updateUserSubscription);

module.exports = router;
