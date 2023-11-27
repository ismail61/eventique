const express = require('express');
const router = express.Router();
const accountRoutes = require('./account');
const cartRoutes = require('./cart');
const itemRoutes = require('./item');
const orderRoutes = require('./order');

router.use('/account', accountRoutes);
router.use('/carts', cartRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
