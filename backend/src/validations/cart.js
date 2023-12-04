const Joi = require('joi');

const addToCartValidation = ({ itemId, quantity }) => {
    const joiSchema = Joi.object().keys({
        itemId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            .messages({
                "string.base": `customerId should be a type of String`,
                "any.required": `itemId is Required.`,
                "string.pattern.base": `Invalid customerId format(need MongoDB 24 characters _id)`,
            }),
        quantity: Joi.number().min(1).max(50).required()
            .messages({
                "number.base": `quantity should be type of Number`,
                "number.min": `quantity must be grater than 1`,
                "number.max": `quantity must be less than or equal to 50`,
                "any.required": `quantity is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ itemId, quantity }, { escapeHtml: true })
    return { value, error }
}

const deleteCartItemValidation = ({ itemId }) => {
    const joiSchema = Joi.object().keys({
        itemId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
            "string.base": `itemId should be a type of String`,
            "any.required": `itemId is required.`,
            "string.pattern.base": `Invalid itemId format`,
        }),
    })
    const { value, error } = joiSchema.validate({ itemId }, { escapeHtml: true })
    return { value, error }
}

module.exports = { addToCartValidation, deleteCartItemValidation };