const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/user/cart');
const { userAuthentication } = require('../../middlewares/authenticate');

router.post('/add', userAuthentication, cartController.addToCart);
router.delete('/:id', userAuthentication, cartController.deleteUserCart);
router.delete('item/:itemId', userAuthentication, cartController.deleteCartItem);
router.get('/', userAuthentication, cartController.getUserCart);

module.exports = router;
