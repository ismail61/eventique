/*
  Mongoose Schema for Query Form.

  - Defines the structure of the Query Form document.
  - Specifies the fields (name, email, message) and their data types.
  - Includes timestamps for record creation and modification.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');

// Define the Query Form Schema
const QueryFormSchema = new mongoose.Schema({
  // Name of the person making the inquiry
  name: {
    type: String,
    required: true,
  },
  // Email address of the person making the inquiry
  email: {
    type: String,
    required: true,
  },
  // Message or inquiry details
  message: {
    type: String,
    required: true,
  },
}, 
{
  // Include timestamps for record creation and modification
  timestamps: true,
  versionKey: false,
});

// Create a Query Form model using the schema
const QueryFormModel = mongoose.model('inquery', QueryFormSchema);

// Export the Query Form model
module.exports = QueryFormModel;
