/*
  Express Router Configuration for Vendor Item Routes.

  - Defines routes related to vendor-specific item operations.
  - Requires vendor authentication for certain routes.
  - Uses the specified controllers to handle CRUD operations on items.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import vendor item controller and authentication middleware
const itemController = require('../../controllers/vendor/item');
const { vendorAuthentication } = require('../../middlewares/authenticate');

// Define routes for vendor item operations
router.get('', vendorAuthentication, itemController.getAllItems);
router.post('/add', vendorAuthentication, itemController.addNewItem);
router.get('/:id', vendorAuthentication, itemController.getItem);
router.patch('/:id/update', vendorAuthentication, itemController.update);

// Export the vendor item router
module.exports = router;
