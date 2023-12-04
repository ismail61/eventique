/*
  Mongoose Schema for Item.

  - Defines the structure of the Item document.
  - Specifies the fields (name, vendorId, description, price, quantity) and their data types.
  - Includes timestamps for record creation and modification.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');

// Define the Item Schema
const ItemSchema = new mongoose.Schema({
  // Name of the item
  name: {
    type: String,
    required: true,
  },
  // Vendor ID associated with the item
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor',
    required: true,
    index: true,
  },
  // Description of the item
  description: String,
  // Price of the item
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  // Quantity of the item
  quantity:  {
    type: Number,
    required: true,
    min: 1,
  },
  image: String,
}, 
{
  // Include timestamps for record creation and modification
  timestamps: true,
  versionKey: false,
});

// Create an Item model using the schema
const ItemModel = mongoose.model('item', ItemSchema);

// Export the Item model
module.exports = ItemModel;
