const CartModel = require('../models/cart')

const addCart = async (data) => {
    try {
        return await CartModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findCart = async (query) => {
    try {
        return await CartModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const incrementItemInCart = async (userId, itemId, quantity) => {
    try {
        return await CartModel.findOneAndUpdate({
            userId,
            'items.id': itemId,
        }, { $inc: { 'items.$.quantity': quantity } }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addItemInCart = async (userId, item) => {
    try {
        return await CartModel.findOneAndUpdate({ userId }, { $push: { items: item } }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateCart = async (query, data) => {
    try {
        return await CartModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getAllCarts = async (query, offset, limit) => {
    try {
        return await CartModel.find(query).sort({ createdAt: -1 }).sort({ createdAt: -1 }).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteCart = async (query) => {
    try {
        return await CartModel.findOneAndDelete(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteItem = async (itemId, userId) => {
    try {
        return await CartModel.findOneAndUpdate({ userId, 'items.id': itemId }, { $pull: { items: { id: itemId } } });
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllCarts, addCart, findCart, deleteCart, updateCart, addItemInCart, incrementItemInCart, deleteItem }