// Import the ItemModel and OrderModel schemas
const ItemModel = require('../models/item');
const OrderModel = require('../models/order');

// Function to create a new order in the database
const createOrder = async (data) => {
    try {
        // Create a new order using the OrderModel schema
        const order = await OrderModel.create(data);

        // Update the quantity of each item in the order in the ItemModel
        const { items } = data;
        for (const item of items) {
            const updatedItem = await ItemModel.findOneAndUpdate(
                { _id: item.id },
                { $inc: { quantity: -Number(item.quantity) } }
            );
        }

        return order;
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to delete an order based on the provided query
const deleteOrder = async (query) => {
    try {
        // Find and delete the order that matches the provided query
        return await OrderModel.findOneAndDelete(query);
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single order based on the provided query
const findOrder = async (query) => {
    try {
        // Find a single order that matches the provided query
        return await OrderModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to update an order based on the provided query and data
const updateOrder = async (query, data) => {
    try {
        // Find and update the order that matches the provided query
        return await OrderModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Configuration for populating options
const populateOptions = {
    path: 'items.vendorId',
    select: 'name email phone',
};

// Function to get a list of orders based on the provided query, offset, and limit
const getAllOrders = async (query, offset, limit) => {
    try {
        // Find orders that match the provided query, populate relevant fields, sort, skip, and limit
        return await OrderModel.find(query)
            .populate('userId', 'name email phone')
            .populate(populateOptions)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the order service functions
module.exports = { getAllOrders, createOrder, findOrder, updateOrder, deleteOrder };
