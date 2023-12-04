// Import Joi for validation
const Joi = require('joi');

// Validation function for user sign-up
const userSignUpValidation = ({ email, name, phone, password }) => {
    // Define Joi schema for user sign-up
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email().required()
            .messages({
                "string.base": `email should be a type of String`,
                "string.empty": `email cannot be an empty field`,
                "string.email": `Please enter Correct email`,
                "any.required": `email is required.`,
            }),
        name: Joi.string().required().messages({
            "string.base": `name should be a type of String`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is required.`,
        }),
        phone: Joi.string().required().messages({
            "string.base": `phone should be a type of String`,
            "string.empty": `phone cannot be an empty field`,
            "any.required": `phone is required.`,
        }),
        password: Joi.string().required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })

    // Validate the input against the defined schema
    const { value, error } = joiSchema.validate({ email, name, phone, password }, { escapeHtml: true })

    // Return the validated value and any validation errors
    return { value, error }
}

// Validation function for vendor sign-up
const vendorSignUpValidation = ({ email, name, phone, iban, code, password }) => {
    // Define Joi schema for vendor sign-up
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email().required()
            .messages({
                "string.base": `email should be a type of String`,
                "string.empty": `email cannot be an empty field`,
                "string.email": `Please enter Correct email`,
                "any.required": `email is required.`,
            }),
        name: Joi.string().required().messages({
            "string.base": `name should be a type of String`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is required.`,
        }),
        phone: Joi.string().required().messages({
            "string.base": `phone should be a type of String`,
            "string.empty": `phone cannot be an empty field`,
            "any.required": `phone is required.`,
        }),
        iban: Joi.string().required().messages({
            "string.base": `iban should be a type of String`,
            "string.empty": `iban cannot be an empty field`,
            "any.required": `iban is required.`,
        }),
        code: Joi.string().min(8).max(8).required().messages({
            "string.base": `Vendor code should be a type of String`,
            "string.empty": `Vendor code cannot be an empty field`,
            "string.min": `Vendor code must be 8 digits long`,
            "string.max": `Vendor code must be 8 digits long`,
            "any.required": `Vendor code is required.`,
        }),
        password: Joi.string().required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })

    // Validate the input against the defined schema
    const { value, error } = joiSchema.validate({ email, name, phone, iban, code, password }, { escapeHtml: true })

    // Return the validated value and any validation errors
    return { value, error }
}

// Validation function for login
const loginValidation = ({ email, password }) => {
    // Define Joi schema for login
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email().required()
            .messages({
                "string.base": `email should be a type of String`,
                "string.empty": `email cannot be an empty field`,
                "string.email": `Please enter Correct email`,
                "any.required": `email is required.`,
            }),
        password: Joi.string().required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })

    // Validate the input against the defined schema
    const { value, error } = joiSchema.validate({ email, password }, { escapeHtml: true })

    // Return the validated value and any validation errors
    return { value, error }
}

// Validation function for forgot password
const forgotPasswordValidation = ({ email }) => {
    // Define Joi schema for login
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email().required()
            .messages({
                "string.base": `email should be a type of String`,
                "string.empty": `email cannot be an empty field`,
                "string.email": `Please enter Correct email`,
                "any.required": `email is required.`,
            }),
    })

    // Validate the input against the defined schema
    const { value, error } = joiSchema.validate({ email }, { escapeHtml: true })

    // Return the validated value and any validation errors
    return { value, error }
}

// Validation function for reset password
const resetPasswordValidation = ({ token, password }) => {
    // Define Joi schema for login
    const joiSchema = Joi.object().keys({
        token: Joi.string().lowercase().required()
            .messages({
                "string.base": `token should be a type of String`,
                "string.empty": `token cannot be an empty field`,
                "any.required": `token is required.`,
            }),
        password: Joi.string().required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })

    // Validate the input against the defined schema
    const { value, error } = joiSchema.validate({ token, password }, { escapeHtml: true })

    // Return the validated value and any validation errors
    return { value, error }
}

// Export the validation functions
module.exports = { userSignUpValidation, vendorSignUpValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation };
