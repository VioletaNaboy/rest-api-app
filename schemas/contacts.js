const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "wrong email format",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .required()
    .messages({
    "any.required": "Set password for user",
    }),
});

module.exports = {
  userSchema
}

