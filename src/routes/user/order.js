const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.get('/', authController.signup);
router.get('/:id', authController.login);
router.post('/create', authController.login);

module.exports = router;
