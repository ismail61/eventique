/*
  Express Router Configuration for User Routes.

  - Combines multiple routers for account, item, and order-related routes.
  - Provides a modular structure for organizing user-related routes.
  - Uses these routers to define user-specific routes for account management, item operations, and order handling.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user account, item, and order routers
const accountRoutes = require('./account');
const orderRoutes = require('./orders');
const itemRoutes = require('./item');

// Use the specified routers for user-related routes
router.use('/account', accountRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);

// Export the user router
module.exports = router;
