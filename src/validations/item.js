const Joi = require('joi');

const addItemValidation = ({ name, description, price, quantity }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required().messages({
            "string.base": `name should be a type of String`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is required.`,
        }),
        description: Joi.string().optional().messages({
            "string.base": `description should be a type of String`,
        }),
        price: Joi.number().required().min(1).messages({
            "number.base": `price should be a type of Number`,
            "string.min": `price must be greater than and equal to 1`,
            "number.empty": `price cannot be an empty field`,
            "any.required": `price is required.`,
        }),
        quantity: Joi.number().required().min(1).messages({
            "number.base": `quantity should be a type of Number`,
            "string.min": `quantity must be greater than and equal to 1`,
            "number.empty": `quantity cannot be an empty field`,
            "any.required": `quantity is required.`,
        }),
    })
    const { value, error } = joiSchema.validate({ name, description, price, quantity }, { escapeHtml: true })
    return { value, error }
}

const updateItemValidation = ({ name, description, price, quantity }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().optional().messages({
            "string.base": `name should be a type of String`,
        }),
        description: Joi.string().optional().messages({
            "string.base": `description should be a type of String`,
        }),
        price: Joi.number().min(1).messages({
            "number.base": `price should be a type of Number`,
            "string.min": `price must be greater than and equal to 1`,
        }),
        quantity: Joi.number().min(1).messages({
            "number.base": `quantity should be a type of Number`,
            "string.min": `quantity must be greater than and equal to 1`,
        }),
       
    })
    const { value, error } = joiSchema.validate({ name, description, price, quantity }, { escapeHtml: true })
    return { value, error }
}

module.exports = { addItemValidation, updateItemValidation };