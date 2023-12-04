/*
  Express Router Configuration for Vendor Account Routes.

  - Defines routes related to vendor account management.
  - Uses the vendor account controller to handle vendor account functionalities.
  - Provides endpoints to get vendor account details, update account information, and change the password.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import vendor account controller and vendor authentication middleware
const vendorAccountController = require('../../controllers/vendor/account');
const { vendorAuthentication } = require('../../middlewares/authenticate');

// Define route to get vendor account details
router.get('', vendorAuthentication, vendorAccountController.me);

// Define route to update vendor account information
router.patch('', vendorAuthentication, vendorAccountController.update);

// Define route to change vendor account password
router.patch('/change-password', vendorAuthentication, vendorAccountController.changePassword);

// Export the vendor account router
module.exports = router;
