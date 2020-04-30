const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().pattern(/[a-z]/i).min(3),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8)
});

module.exports = schema;