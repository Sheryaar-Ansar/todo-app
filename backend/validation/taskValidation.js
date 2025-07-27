const Joi = require('joi');

exports.taskValidation = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    isCompleted: Joi.boolean().default(false).optional()
})