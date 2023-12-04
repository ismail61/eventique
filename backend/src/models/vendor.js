/*
  Mongoose Schema for Vendor.

  - Defines the structure of the Vendor document.
  - Specifies the fields (email, name, phone, iban, code, password) and their data types.
  - Includes timestamps for record creation and modification.
  - Uses unique constraint for the email field.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');

// Define the Vendor Schema
const VendorSchema = new mongoose.Schema({
  // Email of the vendor with unique constraint
  email: {
    type: String,
    unique: true,
  },
  // Name of the vendor
  name: {
    type: String,
    required: true,
  },
  // Phone number of the vendor
  phone: {
    type: String,
    required: true,
  },
  // IBAN (International Bank Account Number) of the vendor
  iban: {
    type: String,
    required: true,
  },
  // Code associated with the vendor
  code: {
    type: String,
    required: true,
  },
  // Password of the vendor
  password: {
    type: String,
    required: true,
  },
}, {
  // Include timestamps for record creation and modification
  timestamps: true,
  versionKey: false,
});

// Create a Vendor model using the schema
const VendorModel = mongoose.model('vendor', VendorSchema);

// Export the Vendor model
module.exports = VendorModel;
