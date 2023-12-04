/*
  Express Router Configuration for User Routes.

  - Aggregates various user-related routes including account, cart, item, order, and inquery.
  - Each submodule handles specific functionalities related to the user domain.
  - Routes are organized and modularized for maintainability and readability.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user-related submodules
const accountRoutes = require('./account');
const cartRoutes = require('./cart');
const itemRoutes = require('./item');
const orderRoutes = require('./order');
const inQueryRoutes = require('./inquery');
const homeRoutes = require('./home');

// Associate submodules with their respective routes
router.use('/account', accountRoutes);
router.use('/cart', cartRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);
router.use('/home', homeRoutes);
router.use('/inquery', inQueryRoutes);

// Export the user router
module.exports = router;
