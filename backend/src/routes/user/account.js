const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.get('', authController.signup);
router.patch('', authController.login);

module.exports = router;
