/*
  Express Router Configuration for Main Routes.

  - Mounts sub-routers for user authentication, user-related routes, vendor authentication,
    and vendor-related routes.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import sub-routers
const userAuthRoutes = require('./auth/user');
const vendorAuthRoutes = require('./auth/vendor');
const userRoutes = require('./user');
const vendorRoutes = require('./vendor');

// Mount sub-routers at specific paths
router.use('/user-auth', userAuthRoutes);
router.use('/user', userRoutes);
router.use('/vendor-auth', vendorAuthRoutes);
router.use('/vendor', vendorRoutes);

// Export the main router
module.exports = router;
