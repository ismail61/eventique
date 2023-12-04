/*
  Inquery Controller

  - Provides a function for adding inqueries.
  - Uses inquery service functions for database interactions.
  - Implements validation for adding inqueries.
  - Handles different scenarios, such as validation errors and database update failures.

  @module Inquery Controller
*/

// Import necessary modules and configurations
const { addInQueryValidation } = require('../../validations/inquery');
const { addInQuery } = require('../../services/inquery');

// Function to add an inquery
async function add(req, res) {
  try {
    // Validate inquery addition information
    const validation = addInQueryValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    // Add the inquery to the database
    const query = await addInQuery(req.body);
    if (!query) {
      return res.status(400).json({ success: false, message: 'Failed to add an inquery' });
    }

    return res.json({ success: true, data: query });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Export the add function
module.exports = { add };
