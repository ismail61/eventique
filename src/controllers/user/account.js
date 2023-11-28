const {
    findUser, findUserWithPassword, updateUser,
} = require('../../services/user');
const { hashValue, compareHash } = require('../../utils/auth');
const { customerAccountInfoValidation } = require('../../validations/user');
const { changePasswordValidation } = require('../../validations/common');

async function me(req, res) {
    const user = await findUser({ _id: req.user?._id });
    return res.status(201).json({ success: true, data: user });
}

async function update(req, res) {
    try {
        const validation = customerAccountInfoValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const user = await updateUser({ _id: req.user?._id }, req.body);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Failed to update user own information' });
        }
        return res.json({ success: true, data: user });
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
        const user = await findUserWithPassword({ _id: req.user?._id });
        const passwordMatch = await compareHash(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(422).json({ success: false, message: 'Current password does not work' });
        }
        const hashPassword = hashValue(req.body.newPassword)
        const updatedUser = await updateUser({ _id: req.user?._id }, { password: hashPassword });
        if (!updatedUser) {
            return res.status(400).json({ success: false, message: 'Failed to change password' });
        }
        return res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { me, update, changePassword };
