/*
  Item Controller

  - Provides functions for retrieving items.
  - Uses item service functions for database interactions.
  - Handles different scenarios, such as item not found and successful item retrieval.

  @module Item Controller
*/

// Import necessary modules and configurations
const { findItem, getItems } = require('../../services/item');

// Function to get all items
async function getAllItems(req, res) {
  try {
    const { vendorId } = req.params;
    const { inputValue } = req.query;
    const query = {};
    if (inputValue) {
      query.name = new RegExp(inputValue, 'i');
    }
    // Retrieve all items from the database
    const items = await getItems({ vendorId, ...query });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to get all vendors
async function getAllVendors(req, res) {
  try {
    // Retrieve all items from the database
    const items = await getItems({});
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


// Function to get a specific item
async function getItem(req, res) {
  try {
    const { id } = req.params;

    // Find the item by its ID in the database
    const item = await findItem({ _id: id });

    // Handle scenario where the item is not found
    if (!item) {
      return res.status(400).json({ success: false, message: 'Invalid Item ID' });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Export the functions
module.exports = { getAllItems, getItem };
