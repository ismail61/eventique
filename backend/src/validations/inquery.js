const Joi = require('joi');

const addInQueryValidation = ({ email, name, message }) => {
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
        message: Joi.string().required().messages({
            "string.base": `message should be a type of String`,
            "string.empty": `message cannot be an empty field`,
            "any.required": `message is required.`,
        }),
    })
    const { value, error } = joiSchema.validate({ email, name, message }, { escapeHtml: true })
    return { value, error }
}

module.exports = { addInQueryValidation };