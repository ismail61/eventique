const VendorModel = require('../models/vendor')

const addVendor = async (data) => {
    try {
        const createdVendor = await VendorModel.create(data);
        const newVendor = createdVendor?.toJSON();
        delete newVendor?.password;
        return newVendor;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findVendor = async (query) => {
    try {
        return await VendorModel.findOne(query).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findVendorWithPassword = async (query) => {
    try {
        return await VendorModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateVendor = async (query, data) => {
    try {
        return await VendorModel.findOneAndUpdate(query, { $set: data }, { new: true }).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { addVendor, findVendor, updateVendor, findVendorWithPassword }