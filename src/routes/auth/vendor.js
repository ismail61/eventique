const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/check-auth', authController.checkAuth);

module.exports = router;