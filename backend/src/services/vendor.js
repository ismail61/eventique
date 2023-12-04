// Import the VendorModel schema
const VendorModel = require('../models/vendor');

// Function to add a new vendor to the database
const addVendor = async (data) => {
    try {
        // Create a new vendor using the VendorModel schema
        const createdVendor = await VendorModel.create(data);

        // Extract the vendor data as a plain JavaScript object, excluding the password field
        const newVendor = createdVendor?.toJSON();
        delete newVendor?.password;

        return newVendor;
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single vendor based on the provided query, excluding the password field
const findVendor = async (query) => {
    try {
        // Find a single vendor that matches the provided query, excluding the password field
        return await VendorModel.findOne(query).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single vendor (including the password field) based on the provided query
const findVendorWithPassword = async (query) => {
    try {
        // Find a single vendor that matches the provided query, including the password field
        return await VendorModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to update a vendor based on the provided query and data, excluding the password field
const updateVendor = async (query, data) => {
    try {
        // Find and update the vendor that matches the provided query, excluding the password field
        return await VendorModel.findOneAndUpdate(query, { $set: data }, { new: true }).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single vendor based on the provided query, excluding the password field
const getVendors = async (query) => {
    try {
        // Find a single vendor that matches the provided query, excluding the password field
        return await VendorModel.find(query).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the vendor service functions
module.exports = { addVendor, findVendor, updateVendor, findVendorWithPassword, getVendors };
