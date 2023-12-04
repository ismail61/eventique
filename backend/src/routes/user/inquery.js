/*
  Express Router Configuration for User Inquery Routes.

  - Defines routes related to user inqueries.
  - Uses the inquery controller to handle inquery-related functionalities.
  - Provides an endpoint to add new inqueries.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user inquery controller
const inQueryController = require('../../controllers/user/inquery');

// Define route for adding a new inquery
router.post('/add', inQueryController.add);

// Export the user inquery router
module.exports = router;
