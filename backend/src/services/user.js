const UserModel = require('../models/user')

const addUser = async (data) => {
    try {
        return await UserModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findUser = async (query) => {
    try {
        return await UserModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateUser = async (query, data) => {
    try {
        return await UserModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getAllUsers = async (query, offset, limit) => {
    try {
        return await UserModel.find(query).sort({ createdAt: -1 }).sort({ createdAt: -1 }).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUsersCount = async (query) => {
    try {
        return await UserModel.countDocuments(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllUsers, addUser, findUser, getUsersCount, updateUser }