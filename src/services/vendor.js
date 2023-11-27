const VendorModel = require('../models/vendor')

const addVendor = async (data) => {
    try {
        return await VendorModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findVendor = async (query) => {
    try {
        return await VendorModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateVendor = async (query, data) => {
    try {
        return await VendorModel.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getAllVendors = async (query, offset, limit) => {
    try {
        return await VendorModel.find(query).sort({ createdAt: -1 }).sort({ createdAt: -1 }).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getVendorsCount = async (query) => {
    try {
        return await VendorModel.countDocuments(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllVendors, addVendor, findVendor, getVendorsCount, updateVendor }