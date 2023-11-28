const {
    findVendor, findVendorWithPassword, updateVendor,
} = require('../../services/vendor');
const { hashValue, compareHash } = require('../../utils/auth');
const { vendorAccountInfoValidation } = require('../../validations/vendor');
const { changePasswordValidation } = require('../../validations/common');

async function me(req, res) {
    const vendor = await findVendor({ _id: req.vendor?._id });
    return res.status(201).json({ success: true, data: vendor });
}

async function update(req, res) {
    try {
        const validation = vendorAccountInfoValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const vendor = await updateVendor({ _id: req.vendor?._id }, req.body);
        if (!vendor) {
            return res.status(400).json({ success: false, message: 'Failed to update vendor own information' });
        }
        return res.json({ success: true, data: vendor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function changePassword(req, res) {
    try {
        const validation = changePasswordValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const vendor = await findVendorWithPassword({ _id: req.vendor?._id });
        const passwordMatch = await compareHash(currentPassword, vendor.password);
        if (!passwordMatch) {
            return res.status(422).json({ success: false, message: 'Current password does not work' });
        }
        const hashPassword = hashValue(req.body.newPassword)
        const updatedVendor = await updateVendor({ _id: req.vendor?._id }, { password: hashPassword });
        if (!updatedVendor) {
            return res.status(400).json({ success: false, message: 'Failed to change password' });
        }
        return res.json({ success: true, data: updatedVendor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { me, update, changePassword };
