/*
  Order Controller

  - Provides functions for handling customer orders.
  - Uses order and item service functions for database interactions.
  - Validates order information before placing the order.
  - Handles payment processing using Stripe API.
  - Provides functionality to retrieve customer orders.

  @module Order Controller
*/

// Import necessary modules and configurations
const { findItem } = require('../../services/item');
const { createOrder, getAllOrders, deleteOrder } = require('../../services/order');
const { createOrderValidation, checkoutOrderValidation } = require('../../validations/order');
const projectConfig = require('../../config');
const stripe = require('stripe')(projectConfig.stripe.privateKey);

// Function to place an order
async function placeOrder(req, res) {
  try {
    // Validate order information
    const validation = createOrderValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    let invalidItem = false;
    const { items, paymentMethod } = req.body;
    const lineItems = [];
    let grandTotalPrice = 0;

    // Iterate through items in the order
    for await (let item of items) {
      // Check if the item exists and has sufficient quantity
      const validItem = await findItem({ _id: item.id, quantity: { $gte: item.quantity } });
      if (!validItem) {
        invalidItem = true;
        break;
      }

      // Prepare item data for Stripe checkout session
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: validItem.name,
          },
          unit_amount: validItem.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      });

      // Update item details for order
      const { price, name, vendorId } = validItem;
      const total_price = Number(item.quantity) * Number(price);
      item.totalPrice = total_price;
      item.name = name;
      item.vendorId = vendorId;
      item.price = price;
      grandTotalPrice += total_price;
    }

    // Check for invalid items
    if (invalidItem) {
      return res.status(400).json({ success: false, message: 'Could not find the items or some items are out of stock.' });
    }

    // Create the order in the database
    const order = await createOrder({ items, paymentMethod, userId: req.user?._id, grandTotalPrice });
    if (!order) {
      return res.status(400).json({ success: false, message: 'Failed to place an order.' });
    }

    // If payment method is Stripe, create a checkout session
    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${projectConfig.frontend.baseUrl}/payment-success`,
        cancel_url: `${projectConfig.frontend.baseUrl}/payment-cancel`,
      });

      // Check if Stripe session creation was successful
      if (!session || !session.url) {
        console.error('Failed to create Stripe Checkout session');
        await deleteOrder({ _id: order._id });
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      // Return the Stripe Checkout session URL
      return res.status(200).json({ success: true, data: { url: session.url } });
    }

    // Return the order details
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to get checkout information for the order
async function checkoutInfo(req, res) {
  try {
    // Validate order information
    const validation = checkoutOrderValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    let invalidItem = false;
    const { items } = req.body;
    let grandTotalPrice = 0;

    // Iterate through items in the order
    for await (let item of items) {
      // Check if the item exists and has sufficient quantity
      const validItem = await findItem({ _id: item.id, quantity: { $gte: item.quantity } });
      if (!validItem) {
        invalidItem = true;
        break;
      }

      // Update item details for order
      const { price, name } = validItem;
      const total_price = Number(item.quantity) * Number(price);
      item.totalPrice = total_price;
      item.name = name;
      item.price = price;
      grandTotalPrice += total_price;
    }

    // Check for invalid items
    if (invalidItem) {
      return res.status(400).json({ success: false, message: 'Could not find the items or some items are out of stock.' });
    }

    // Return checkout information
    return res.status(200).json({ success: true, data: { items, grandTotalPrice } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to get customer's orders
async function getCustomerOrders(req, res) {
  try {
    // Retrieve customer orders from the database
    const orders = await getAllOrders({ userId: req.user._id });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Export the functions
module.exports = { placeOrder, checkoutInfo, getCustomerOrders };
