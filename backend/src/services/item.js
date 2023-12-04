// Import the ItemModel schema
const ItemModel = require('../models/item');

// Function to add a new item to the database
const addItem = async (data) => {
    try {
        // Create a new item using the ItemModel schema
        return await ItemModel.create(data);
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single item based on the provided query
const findItem = async (query) => {
    try {
        // Find a single item that matches the provided query
        return await ItemModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to update an item based on the provided query and data
const updateItem = async (query, data) => {
    try {
        // Find and update the item that matches the provided query
        return await ItemModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to get a list of items based on the provided query
const getItems = async (query) => {
    try {
        // Find items that match the provided query, populate the 'vendorId' field, and sort by creation date
        return await ItemModel.find(query).populate('vendorId').sort({ createdAt: -1 }).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to get a list of items based on the provided query
const getVendorItems = async (query) => {
    try {
        // Find items that match the provided query, populate the 'vendorId' field, and sort by creation date
        return await ItemModel.find(query).sort({ createdAt: -1 }).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the item service functions
module.exports = { getItems, addItem, findItem, updateItem, getVendorItems };
