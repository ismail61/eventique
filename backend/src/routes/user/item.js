const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.get('/', authController.checkAuth);
router.get('/:id', authController.checkAuth);

module.exports = router;
