const { userSignUpValidation, loginValidation } = require('../../validations/auth');
const jwt = require('jsonwebtoken');
const projectConfig = require('../../config');
const {
    findUser, addUser, findUserWithPassword,
} = require('../../services/user');
const { hashValue, compareHash, generateToken } = require('../../utils/auth');

async function signup(req, res) {
    // Validate admin information
    const validation = userSignUpValidation(req.body);
    if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    const useExists = await findUser({ email: req.body.email });
    if (useExists) {
        return res.status(400).json({ success: false, message: 'Email already exists.' });
    }
    // Hash the password
    const hashedPassword = await hashValue(req.body.password);

    // Save admin into the database
    const user = await addUser({ ...req.body, password: hashedPassword });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Failed to sign up' });
    }
    return res.status(201).json({ success: true, data: user });
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const validation = loginValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const user = await findUserWithPassword({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await compareHash(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = generateToken(user);
        return res.json({ success: true, data: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const checkAuth = async (req, res) => {
    const token =
        req.body.token || req.query.token || req.headers['x-access-token'] || req.header('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, projectConfig?.jwt?.key);
        const user = await findUser({ _id: decoded?._id });
        if (!user) return res.status(403).send({ message: 'Invalid Token' });
        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error)
        return res.status(403).send({ message: 'Invalid Token' });
    }
}

module.exports = { signup, login, checkAuth };
