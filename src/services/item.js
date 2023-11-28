const ItemModel = require('../models/item')

const addItem = async (data) => {
    try {
        return await ItemModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findItem = async (query) => {
    try {
        return await ItemModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateItem = async (query, data) => {
    try {
        return await ItemModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getItems = async (query, offset, limit) => {
    try {
        return await ItemModel.find(query).sort({ createdAt: -1 }).sort({ createdAt: -1 }).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getItems, addItem, findItem, updateItem }