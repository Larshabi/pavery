const Joi = require('joi');

exports.storeValidationBody = (payload)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string(),
        tags:Joi.string(),
        paveryStoreLink:Joi.string(),
        webLink:Joi.string(),
        whatsappLink:Joi.string(),
        instagramLink:Joi.string(),
        facebookLink:Joi.string(),
        buttonBackground:Joi.string(),
        buttonTextColor:Joi.string(),
        pageBackgroundColor:Joi.string()
    })
    return schema.validate(payload);
}