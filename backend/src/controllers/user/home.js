/*
  home Controller

  - Provides functions for retrieving homes.
  - Uses home service functions for database interactions.
  - Handles different scenarios, such as home not found and successful home retrieval.

  @module home Controller
*/

const { getVendors } = require("../../services/vendor");

// Import necessary modules and configurations

// Function to get all vendors
async function getAllVendors(req, res) {
  try {
    // Retrieve all vendors from the database
    const vendors = await getVendors({});
    return res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
// Export the functions
module.exports = { getAllVendors };
