const jwt = require('jsonwebtoken');
const projectConfig = require('../config')

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user._email
    }, projectConfig?.jwt?.key, {
        expiresIn: projectConfig?.jwt?.expire,
    })
}

const hashValue = async (value) => {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(value, salt);
}

const compareHash = async (oldValue, value) => {
    return await bcrypt.compare(oldValue, value);
}
module.exports = { generateToken, hashValue, compareHash };