/*
  Express Router Configuration for Vendor Authentication Routes.

  - Defines routes for vendor signup, login, and checking authentication status.
  - Routes are handled by the corresponding controller methods.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import vendor authentication controller
const authController = require('../../controllers/auth/vendor');

// Define routes and associate with controller methods
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/check-auth', authController.checkAuth);

// Export the vendor authentication router
module.exports = router;
