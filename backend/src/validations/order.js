const Joi = require('joi');
const paymentMethodEnum = ['stripe', 'cod'];

const createOrderValidation = ({ items, paymentMethod }) => {
    const itemsSchema = Joi.object().keys({
        quantity: Joi.number().min(1).max(100).required()
            .messages({
                "number.base": `quantity should be type of Number`,
                "number.min": `quantity must be greater than 0`,
                "number.max": `quantity must be less than 100`,
                "any.required": `quantity is Required.`
            }),
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            .messages({
                "string.base": `Item id should be type of ObjectID`,
                "any.required": `Item id is Required.`,
                "string.pattern.base": `Invalid item id format`,
            }),
    }).required().min(1)
        .messages({
            "any.required": `Item is Required.`
        })
    const joiSchema = Joi.object().keys({
        paymentMethod: Joi.string().required()
            .valid(...paymentMethodEnum)
            .messages({
                "string.base": `paymentMethod should be type of String`,
                "any.required": `paymentMethod is Required.`,
                "any.only": `Invalid paymentMethod. Allowed values: ${paymentMethodEnum.join(', ')}`,
            }),
        items: Joi.array().items(itemsSchema).min(1),
    });

    const { value, error } = joiSchema.validate({
        items,
        paymentMethod,
    }, {
        escapeHtml: true
    })
    return { value, error }
}

const checkoutOrderValidation = ({ items }) => {
    const itemsSchema = Joi.object().keys({
        quantity: Joi.number().min(1).max(100).required()
            .messages({
                "number.base": `quantity should be type of Number`,
                "number.min": `quantity must be greater than 0`,
                "number.max": `quantity must be less than 100`,
                "any.required": `quantity is Required.`
            }),
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            .messages({
                "string.base": `Item id should be type of ObjectID`,
                "any.required": `Item id is Required.`,
                "string.pattern.base": `Invalid item id format`,
            }),
    }).required().min(1)
        .messages({
            "any.required": `Item is Required.`
        })
    const joiSchema = Joi.object().keys({
        items: Joi.array().items(itemsSchema).min(1),
    });

    const { value, error } = joiSchema.validate({
        items,
    }, {
        escapeHtml: true
    })
    return { value, error }
}

module.exports = { createOrderValidation, checkoutOrderValidation };