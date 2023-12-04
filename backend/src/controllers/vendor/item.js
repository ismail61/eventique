/*
  Vendor Item Controller

  - Provides functions for handling vendor item-related operations.
  - Uses item service functions for database interactions.
  - Validates item information before adding or updating.
  - Retrieves a list of items, gets a specific item, updates item information, and adds a new item.

  @module Vendor Item Controller
*/

// Import necessary modules
const {
    findItem,
    addItem,
    updateItem,
    getVendorItems,
  } = require('../../services/item');
  const {
    addItemValidation,
    updateItemValidation,
  } = require('../../validations/item');
  
  // Function to get all items belonging to a vendor
  async function getAllItems(req, res) {
    try {
      // Retrieve items from the database using vendor ID
      const items = await getVendorItems({ vendorId: req.vendor?._id });
      return res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Function to get a specific item belonging to a vendor
  async function getItem(req, res) {
    try {
      // Extract item ID from the request parameters
      const { id } = req.params;
  
      // Retrieve the item from the database using item ID and vendor ID
      const item = await findItem({ _id: id, vendorId: req.vendor?._id });
  
      // Check if the item exists
      if (!item) {
        return res.status(400).json({ success: false, message: 'Invalid Item id' });
      }
  
      // Return success response with the item information
      return res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Function to update item information
  async function update(req, res) {
    try {
      // Validate item information
      const validation = updateItemValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Extract item ID from the request parameters
      const { id } = req.params;
  
      // Update item information in the database
      const item = await updateItem({ vendorId: req.vendor?._id, _id: id }, req.body);
      
      // Check if the item update was successful
      if (!item) {
        return res.status(400).json({ success: false, message: 'Failed to update item info' });
      }
  
      // Return success response with the updated item information
      return res.json({ success: true, data: item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Function to add a new item for a vendor
  async function addNewItem(req, res) {
    try {
      // Validate item information
      const validation = addItemValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Add a new item to the database
      const item = await addItem({
        ...req.body,
        vendorId: req.vendor?._id,
      });
  
      // Check if the item addition was successful
      if (!item) {
        return res.status(400).json({ success: false, message: 'Failed to add new item' });
      }
  
      // Return success response with the added item information
      return res.json({ success: true, data: item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  
  // Export the functions
  module.exports = { getAllItems, getItem, update, addNewItem };
  