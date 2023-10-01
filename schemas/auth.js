const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.email": "wrong email format",
      "any.required": "missing email",
    }),
  password: Joi.string()
    .required()
    .messages({
    "any.required": "missing phone number",
    }),
});



module.exports = {
 userSchema
}
