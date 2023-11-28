const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/order');

router.post('/create', orderController.createOrder);

module.exports = router;
