const express = require('express');
const router = express.Router();
const { getAllUsers, signupUser, authUser } = require('./../controller/userController')
const { checkSignupPayload } = require('./../middleware/userValidation')

router.get('/', getAllUsers);
router.post('/signup', checkSignupPayload, signupUser);
router.post('/signin', authUser);

module.exports = router;