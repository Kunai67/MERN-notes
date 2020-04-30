const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().min(3),
    body: Joi.string().min(3),
    tags: Joi.array().items(Joi.string().min(3)).min(0),
});

module.exports = schema;