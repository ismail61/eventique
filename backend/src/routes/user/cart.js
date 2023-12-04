/*
  Express Router Configuration for User Cart Routes.

  - Defines routes for retrieving user cart, adding items to the cart, and deleting cart items.
  - User authentication middleware is applied to protect the routes.
  - Routes are handled by the corresponding controller methods.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import cart controller and user authentication middleware
const cartController = require('../../controllers/user/cart');
const { userAuthentication } = require('../../middlewares/authenticate');

// Define routes and associate with controller methods
router.get('/', userAuthentication, cartController.getUserCart);
router.post('/add', userAuthentication, cartController.addToCart);
router.delete('/item-delete/:itemId', userAuthentication, cartController.deleteCartItem);

// Export the user cart router
module.exports = router;
