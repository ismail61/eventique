/*
  Mongoose Schema for the Cart Model.

  - Defines the structure of the Cart document in MongoDB.
  - Includes a reference to the Item model for each item in the cart.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');

// Define the Cart schema
const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      quantity: Number,
      _id: false,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});

// Create the Cart model
const CartModel = mongoose.model('cart', CartSchema);

// Export the Cart model
module.exports = CartModel;
