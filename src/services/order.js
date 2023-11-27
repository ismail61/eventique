const OrderModel = require('../models/order')

const addOrder = async (data) => {
    try {
        return await OrderModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findOrder = async (query) => {
    try {
        return await OrderModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateOrder = async (query, data) => {
    try {
        return await OrderModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getAllOrders = async (query, offset, limit) => {
    try {
        return await OrderModel.find(query).sort({ createdAt: -1 }).sort({ createdAt: -1 }).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getOrdersCount = async (query) => {
    try {
        return await OrderModel.countDocuments(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllOrders, addOrder, findOrder, getOrdersCount, updateOrder }