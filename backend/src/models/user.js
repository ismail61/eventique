/*
  Mongoose Schema for User.

  - Defines the structure of the User document.
  - Specifies the fields (email, name, phone, password) and their data types.
  - Includes timestamps for record creation and modification.
  - Uses unique constraint for the email field.

  @module Mongoose Schema
*/

const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  // Email of the user with unique constraint
  email: {
    type: String,
    unique: true,
  },
  // Name of the user
  name: {
    type: String,
    required: true,
  },
  // Phone number of the user
  phone: {
    type: String,
    required: true,
  },
  // Password of the user
  password: {
    type: String,
    required: true,
  },
  // For reset password
  resetPasswordToken: String,
  resetPasswordExpireTime: Number,
  regin: String,
}, {
  // Include timestamps for record creation and modification
  timestamps: true,
  versionKey: false,
});

// Create a User model using the schema
const UserModel = mongoose.model('user', UserSchema);

// Export the User model
module.exports = UserModel;
