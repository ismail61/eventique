const UserModel = require('../models/user')

const addUser = async (data) => {
    try {
        const createdUser = await UserModel.create(data);
        const newUser = createdUser?.toJSON();
        delete newUser?.password;
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findUser = async (query) => {
    try {
        return await UserModel.findOne(query).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findUserWithPassword = async (query) => {
    try {
        return await UserModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateUser = async (query, data) => {
    try {
        return await UserModel.findOneAndUpdate(query, { $set: data }, { new: true }).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { addUser, findUser, updateUser, findUserWithPassword }