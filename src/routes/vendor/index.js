const express = require('express');
const router = express.Router();
const accountRoutes = require('./account');
const orderRoutes = require('./orders');
const itemRoutes = require('./item');

router.use('/account', accountRoutes);
router.use('/orders', orderRoutes);
router.use('/items', itemRoutes);

module.exports = router;
