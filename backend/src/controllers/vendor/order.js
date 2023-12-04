/*
  Vendor Order Controller

  - Provides a function for handling vendor order-related operations.
  - Uses order service functions for database interactions.
  - Retrieves a list of orders associated with a vendor.

  @module Vendor Order Controller
*/

// Import necessary module
const { getAllOrders } = require('../../services/order');

// Function to get orders associated with a vendor
async function getVendorOrders(req, res) {
  try {
    // Retrieve all orders from the database containing items associated with the vendor
    const orders = await getAllOrders({ 'items.vendorId': req.vendor._id });

    // Initialize an array to store vendor-specific order information
    const vendorOrders = [];

    // Iterate through each order
    for await (const order of orders) {
      // Initialize an array to store vendor-specific order items
      const orderItems = [];

      // Iterate through each item in the order
      for await (const item of order.items) {
        // Check if the item belongs to the current vendor
        if (String(item.vendorId?._id) === String(req.vendor._id)) {
          orderItems.push(item);
        }
      }

      // Check if there are vendor-specific order items
      if (orderItems.length > 0) {
        // Push vendor-specific order information to the array
        vendorOrders.push({
          _id: order._id,
          user: order.userId,
          paymentMethod: order.paymentMethod,
          status: order.status,
          createdAt: order.createdAt,
          items: orderItems,
        });
      }
    }

    // Return success response with vendor-specific order information
    return res.status(200).json({ success: true, data: vendorOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Export the function
module.exports = { getVendorOrders };
