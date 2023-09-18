const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing name",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.email": "wrong email format",
      "any.required": "missing email",
    }),
  phone: Joi.string()
    .required()
    .messages({
    "any.required": "missing phone number",
  }),
});

module.exports = {
  addSchema,
}