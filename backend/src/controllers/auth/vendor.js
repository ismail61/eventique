/*
  Vendor Authentication Controller

  - Provides functions for vendor signup, login, and token verification.
  - Uses validation, hashing, and JWT token generation.
  - Handles different scenarios, such as existing vendor check, password validation, and token verification.

  @module Vendor Authentication Controller
*/

// Import necessary modules and configurations
const { loginValidation, vendorSignUpValidation } = require('../../validations/auth');
const jwt = require('jsonwebtoken');
const projectConfig = require('../../config');
const {
  findVendor, addVendor, findVendorWithPassword,
} = require('../../services/vendor');
const { hashValue, compareHash, generateToken } = require('../../utils/auth');

// Function to handle vendor signup
async function signup(req, res) {
  // Validate vendor information
  const validation = vendorSignUpValidation(req.body);
  if (validation.error) {
    return res.status(422).json({ success: false, message: validation.error.details[0].message });
  }

  // Check if the vendor already exists
  const vendorExists = await findVendor({ email: req.body.email });
  if (vendorExists) {
    return res.status(400).json({ success: false, message: 'Email already exists.' });
  }

  // Hash the password
  const hashedPassword = await hashValue(req.body.password);

  // Save vendor into the database
  const vendor = await addVendor({ ...req.body, password: hashedPassword });
  if (!vendor) {
    return res.status(400).json({ success: false, message: 'Failed to sign up' });
  }

  return res.status(201).json({ success: true, data: vendor });
}

// Function to handle vendor login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate login information
    const validation = loginValidation(req.body);
    if (validation.error) {
      return res.status(422).json({ success: false, message: validation.error.details[0].message });
    }

    // Find vendor with password
    const vendor = await findVendorWithPassword({ email });
    if (!vendor) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await compareHash(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = generateToken(vendor);
    return res.status(200).json({ success: true, data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Function to check vendor authentication using a token
const checkAuth = async (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: 'A token is required for authentication' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, projectConfig?.jwt?.key);

    // Find vendor based on the decoded token
    const vendor = await findVendor({ _id: decoded?._id });
    if (!vendor) return res.status(403).send({ message: 'Invalid Token' });

    return res.status(200).send({ data: vendor });
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: 'Invalid Token' });
  }
}

// Export the signup, login, and checkAuth functions
module.exports = { signup, login, checkAuth };
