/*
  Express Router Configuration for User Item Routes.

  - Defines routes related to user items.
  - Uses the item controller to handle item-related functionalities.
  - Provides endpoints to retrieve all items and a specific item by ID.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user item controller
const itemController = require('../../controllers/user/item');

// Define route to get a specific item by ID
router.get('/single/:id', itemController.getItem);

// Define route to get all items
router.get('/:vendorId', itemController.getAllItems);


// Export the user item router
module.exports = router;
