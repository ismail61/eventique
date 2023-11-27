const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/user');

router.post('/add', authController.signup);
router.patch('/update', authController.login);
router.delete('/:id', authController.login);
router.delete('/item', authController.login);
router.get('/', authController.login);

module.exports = router;
