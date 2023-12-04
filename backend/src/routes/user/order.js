/*
  Express Router Configuration for User Order Routes.

  - Defines routes related to user orders.
  - Uses the order controller to handle order-related functionalities.
  - Provides endpoints to get customer orders, checkout information, and place an order.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user order controller and user authentication middleware
const orderController = require('../../controllers/user/order');
const { userAuthentication } = require('../../middlewares/authenticate');

// Define route to get customer orders
router.get('/', userAuthentication, orderController.getCustomerOrders);

// Define route to get checkout information
router.post('/checkout-info', userAuthentication, orderController.checkoutInfo);

// Define route to place an order
router.post('/place', userAuthentication, orderController.placeOrder);

// Export the user order router
module.exports = router;
