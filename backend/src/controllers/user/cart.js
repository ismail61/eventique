/*
  User Cart Controller

  - Provides functions for adding items to the user's cart, retrieving the user's cart, and deleting items from the cart.
  - Uses cart and item service functions for database interactions.
  - Implements validation for adding and deleting items in the cart.
  - Handles different scenarios, such as validation errors, invalid items, and database update failures.

  @module User Cart Controller
*/

// Import necessary modules and configurations
const {
  findCart, addItemInCart, incrementItemInCart, addCart, deleteItem,
} = require('../../services/cart');
const { findItem } = require('../../services/item');
const { addToCartValidation, deleteCartItemValidation } = require('../../validations/cart');

// Function to add an item to the user's cart
async function addToCart(req, res) {
  try {
    // Validate cart item addition information
    const validation = addToCartValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    // Extract item id and quantity from the request body
    const { itemId, quantity } = req.body;

    // Check if the item is valid and has sufficient quantity
    const checkValidItem = await findItem({ _id: itemId });
    if (!checkValidItem || checkValidItem?.quantity < 1 || checkValidItem?.quantity < quantity) {
      return res.status(400).json({ success: false, message: 'Invalid Item id or quantity mismatch' });
    }

    // Check if the user has an existing cart
    const isExistCart = await findCart({ userId: req.user?._id });
    if (!isExistCart) {
      // If no existing cart, create a new cart with the current item
      const cart = await addCart({ userId: req.user?._id, items: [{ id: itemId, quantity }] });
      return res.json({ success: true, data: cart });
    }

    // Check if the item already exists in the cart
    const isExistItem = await findCart({ userId: req.user?._id, 'items.id': itemId });
    if (!isExistItem) {
      // If the item doesn't exist, add it to the existing cart
      const cart = await addItemInCart(req.user?._id, { id: itemId, quantity });
      return res.json({ success: true, data: cart });
    }

    // If the item already exists, increment its quantity in the cart
    const cart = await incrementItemInCart(req.user?._id, itemId, quantity);
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Failed to add to cart' });
    }

    return res.json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to retrieve the user's cart
async function getUserCart(req, res) {
  try {
    // Find and return the user's cart
    const cart = await findCart({ userId: req.user?._id });
    let total = 0;
    for await (const item of cart?.items) {
      total += (item?.id?.price * item.quantity) || 0;
    }
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Cart Not Found' });
    }
    return res.json({ success: true, data: {
      ...cart,
      total
    } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to delete an item from the user's cart
async function deleteCartItem(req, res) {
  try {
    // Validate cart item deletion information
    const validation = deleteCartItemValidation(req.params);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    // Delete the item from the user's cart
    const cart = await deleteItem(req.params.itemId, req.user?._id);
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Failed to delete cart item' });
    }

    return res.json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Export the addToCart, getUserCart, and deleteCartItem functions
module.exports = { addToCart, getUserCart, deleteCartItem };
