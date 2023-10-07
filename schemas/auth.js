const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
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

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(["starter", "pro", "business"])) 
    .required()
    .messages({
    'any.required': 'missing required subscription field',
  }),
});


module.exports = {
 userSchema, updateSubscriptionSchema
}
