const jwt = require('jsonwebtoken');
const projectConfig = require('../config');
const { findUser } = require('../services/user');
const { findVendor } = require('../services/vendor');

const userAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers['x-access-token'] || req.header('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, projectConfig?.jwt?.key);
        const user = await findUser({ _id: decoded?._id });
        if (!user) return res.status(403).send({ err: 'Invalid Token' });
        req.user = decoded;
    } catch (error) {
        console.log(error);
        return res.status(403).send({ message: 'Invalid Token' });
    }
    return next();
}

const vendorAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers['x-access-token'] || req.header('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, projectConfig?.jwt?.key);
        const vendor = await findVendor({ _id: decoded?._id });
        if (!vendor) return res.status(403).send({ err: 'Invalid Token' });
        req.vendor = decoded;
    } catch (error) {
        console.log(error);
        return res.status(403).send({ message: 'Invalid Token' });
    }
    return next();
}

module.exports = { vendorAuthentication, userAuthentication };