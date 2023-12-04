const express = require('express');
const router = express.Router();

// Import user item controller
const vendorController = require('../../controllers/user/home');

// Define route to get all items
router.get('/vendors', vendorController.getAllVendors);

// Export the user item router
module.exports = router;