const Joi = require('joi');

const userSignUpValidation = ({ email, name, phone, password }) => {
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
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.pattern.base": `password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })
    const { value, error } = joiSchema.validate({ email, name, phone, password }, { escapeHtml: true })
    return { value, error }
}

const vendorSignUpValidation = ({ email, name, phone, ian, code, password }) => {
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
            "string.base": `IBAN should be a type of String`,
            "string.empty": `IBAN cannot be an empty field`,
            "any.required": `IBAN is required.`,
        }),
        code: Joi.string().min(8).max(8).required().messages({
            "string.base": `Vendor code should be a type of String`,
            "string.empty": `Vendor code cannot be an empty field`,
            "string.min": `Vendor code must be 8 digits long`,
            "string.max": `Vendor code must be 8 digits long`,
            "any.required": `Vendor code is required.`,
        }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.pattern.base": `password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })
    const { value, error } = joiSchema.validate({ email, name, phone, ian, code, password }, { escapeHtml: true })
    return { value, error }
}

const loginValidation = ({ email, password }) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email().required()
            .messages({
                "string.base": `email should be a type of String`,
                "string.empty": `email cannot be an empty field`,
                "string.email": `Please enter Correct email`,
                "any.required": `email is required.`,
            }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `password should be a type of Text`,
                "string.pattern.base": `password must be minimum 6 Characters with one special character and one number! `,
                "string.empty": `password cannot be an empty field`,
                "any.required": `password is required.`,
            })
    })
    const { value, error } = joiSchema.validate({ email, password }, { escapeHtml: true })
    return { value, error }
}

module.exports = { userSignUpValidation, vendorSignUpValidation, loginValidation };