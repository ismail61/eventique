import Joi from 'joi';

const changePasswordValidation = ({ currentPassword, newPassword }) => {
    const joiSchema = Joi.object().keys({
        currentPassword: Joi.string().required().messages({
            "string.base": `currentPassword should be a type of String`,
            "string.empty": `currentPassword cannot be an empty field`,
            "any.required": `currentPassword is required.`,
        }),
        newPassword: Joi.string().required().messages({
            "string.base": `newPassword should be a type of String`,
            "string.empty": `newPassword cannot be an empty field`,
            "any.required": `newPassword is required.`,
        }),
    })
    const { value, error } = joiSchema.validate({ currentPassword, newPassword }, { escapeHtml: true })
    return { value, error }
}

export { changePasswordValidation }