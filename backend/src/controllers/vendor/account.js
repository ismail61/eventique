/*
  Vendor Account Controller

  - Provides functions for handling vendor account-related operations.
  - Uses vendor service functions for database interactions.
  - Validates vendor account information before updating.
  - Handles password change functionality for vendors.

  @module Vendor Account Controller
*/

// Import necessary modules
const {
    findVendor,
    findVendorWithPassword,
    updateVendor,
  } = require('../../services/vendor');
  const { hashValue, compareHash } = require('../../utils/auth');
  const {
    vendorAccountInfoValidation,
    changePasswordValidation,
  } = require('../../validations/vendor');
  
  // Function to get vendor's own information
  async function me(req, res) {
    try {
      // Retrieve vendor information from the database using vendor ID
      const vendor = await findVendor({ _id: req.vendor?._id });
      return res.status(201).json({ success: true, data: vendor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Function to update vendor's own information
  async function update(req, res) {
    try {
      // Validate vendor account information
      const validation = vendorAccountInfoValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Update vendor information in the database
      const vendor = await updateVendor({ _id: req.vendor?._id }, req.body);
      if (!vendor) {
        return res.status(400).json({ success: false, message: 'Failed to update vendor own information' });
      }
  
      // Return the updated vendor information
      return res.json({ success: true, data: vendor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Function to change vendor's password
  async function changePassword(req, res) {
    try {
      // Validate password change information
      const validation = changePasswordValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Retrieve vendor information with password from the database
      const vendor = await findVendorWithPassword({ _id: req.vendor?._id });
      
      // Check if the current password matches
      const passwordMatch = await compareHash(req.body.currentPassword, vendor.password);
      if (!passwordMatch) {
        return res.status(422).json({ success: false, message: 'Current password does not match' });
      }
  
      // Hash the new password and update in the database
      const hashPassword = await hashValue(req.body.newPassword);
      const updatedVendor = await updateVendor({ _id: req.vendor?._id }, { password: hashPassword });
      
      // Check if the password update was successful
      if (!updatedVendor) {
        return res.status(400).json({ success: false, message: 'Failed to change password' });
      }
  
      // Return success response with updated vendor information
      return res.json({ success: true, data: updatedVendor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Export the functions
  module.exports = { me, update, changePassword };
  