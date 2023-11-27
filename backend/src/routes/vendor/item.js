const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.get('/', authController.checkAuth);
router.get('/:id', authController.checkAuth);
router.post('/add', authController.checkAuth);
router.patch('/:id/update', authController.checkAuth);

module.exports = router;
