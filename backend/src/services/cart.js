// Import the CartModel schema
const CartModel = require('../models/cart');

// Function to add a new cart to the database
const addCart = async (data) => {
    try {
        // Create a new cart using the CartModel schema
        return await CartModel.create(data);
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a cart based on a query
const findCart = async (query) => {
    try {
        // Find a cart based on the provided query
        // Populate the 'items' field, excluding 'quantity' and 'vendorId'
        return await CartModel.findOne(query).populate('items.id', '-quantity -vendorId').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to increment the quantity of a specific item in the user's cart
const incrementItemInCart = async (userId, itemId, quantity) => {
    try {
        // Find and update the cart with the incremented quantity for the specified item
        return await CartModel.findOneAndUpdate({
            userId,
            'items.id': itemId,
        }, { $inc: { 'items.$.quantity': quantity } }, { new: true }).populate('items.id', '-quantity -vendorId').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to add a new item to the user's cart
const addItemInCart = async (userId, item) => {
    try {
        // Find the cart and push the new item to the 'items' array
        return await CartModel.findOneAndUpdate({ userId }, { $push: { items: item } }, { new: true }).populate('items.id', '-quantity -vendorId').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to update the entire cart based on a query
const updateCart = async (query, data) => {
    try {
        // Find and update the cart based on the provided query
        return await CartModel.findOneAndUpdate(query, { $set: data }, { new: true }).populate('items.id', '-quantity -vendorId').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to delete a specific item from the user's cart
const deleteItem = async (itemId, userId) => {
    try {
        // Find and update the cart to remove the specified item
        return await CartModel.findOneAndUpdate({ userId, 'items.id': itemId }, { $pull: { items: { id: itemId } } }, { new: true }).populate('items.id', '-quantity -vendorId');
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the cart service functions
module.exports = { addCart, findCart, updateCart, addItemInCart, incrementItemInCart, deleteItem };
