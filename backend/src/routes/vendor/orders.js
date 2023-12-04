/*
  Express Router Configuration for Vendor Order Routes.

  - Defines routes related to vendor-specific order operations.
  - Requires vendor authentication for certain routes.
  - Uses the specified controller to handle retrieving vendor orders.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import vendor order controller and authentication middleware
const orderController = require('../../controllers/vendor/order');
const { vendorAuthentication } = require('../../middlewares/authenticate');

// Define route for retrieving vendor orders
router.get('/', vendorAuthentication, orderController.getVendorOrders);

// Export the vendor order router
module.exports = router;
