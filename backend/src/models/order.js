/*
  Mongoose Schema for Order.

  - Defines the structure of the Order document.
  - Specifies the fields (userId, status, items, grandTotalPrice, paymentMethod) and their data types.
  - Includes timestamps for record creation and modification.
  - Uses ItemSchema as a subdocument for items.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');
const OrderStatusEnum = require('./enum');

// Define the Item Schema for subdocuments
const ItemSchema = new mongoose.Schema(
  {
    // ID of the item
    id: {
      type: String,
      required: true,
    },
    // Name of the item
    name: {
      type: String,
      required: true,
    },
    // Quantity of the item
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    // Vendor ID associated with the item
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendor',
      required: true,
      index: true,
    },
    // Price of the item
    price: {
      type: Number,
      required: true,
    },
    // Total price for the quantity of the item
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// Define the Order Schema
const orderSchema = new mongoose.Schema({
  // User ID associated with the order
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // Status of the order with default value as 'CONFIRMED'
  status: {
    type: String,
    default: OrderStatusEnum.CONFIRMED,
  },
  // Array of items associated with the order using ItemSchema
  items: {
    type: [ItemSchema],
  },
  // Grand total price of the order
  grandTotalPrice: {
    type: Number,
    required: true,
  },
  // Payment method used for the order
  paymentMethod: String,
}, {
  // Include timestamps for record creation and modification
  timestamps: true,
  versionKey: false,
});

// Create an Order model using the schema
const OrderModel = mongoose.model('order', orderSchema);

// Export the Order model
module.exports = OrderModel;
