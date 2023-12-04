// Import the InQueryModel schema
const InQueryModel = require('../models/inquery');

// Function to add a new inquery to the database
const addInQuery = async (data) => {
    try {
        // Create a new inquery using the InQueryModel schema
        return await InQueryModel.create(data);
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the inquery service functions
module.exports = { addInQuery };
