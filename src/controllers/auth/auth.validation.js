const Joi = require('joi');

exports.validateRegisterBody = (payload) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(payload)
}

exports.validateLoginBody = (payload) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(payload)
}