const express = require('express');
const router = express.Router();
const userAuthRoutes = require('./auth/user');
const vendorAuthRoutes = require('./auth/vendor');
const userRoutes = require('./user');
const vendorRoutes = require('./vendor');

router.use('/user-auth', userAuthRoutes);
router.use('/vendor-auth', vendorAuthRoutes);
router.use('/vendor', vendorRoutes);
router.use('/user', userRoutes);


module.exports = router;
