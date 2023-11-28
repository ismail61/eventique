import Joi from 'joi';

const vendorAccountInfoValidation = ({ name, phone }) => {
  const joiSchema = Joi.object().keys({
    name: Joi.string()
      .messages({
        'string.base': `Name should be a type of String`,
      }),
    phone: Joi.string().messages({
      "string.base": `phone should be a type of String`,
    }),
    iban: Joi.string().messages({
      "string.base": `IBAN should be a type of String`,
    }),
  })
  phone = phone?.toString();
  const { value, error } = joiSchema.validate({ name, phone }, { escapeHtml: true })
  return { value, error }
}

export { vendorAccountInfoValidation }