const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

exports.categoriesValidationBody = (payload)=>{
     const schema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
     })
     return schema.validate(payload);
}
exports.itemValidationBody = (payload)=>{
   const schema = Joi.object({
         name:Joi.string().required(),
         internalName:Joi.string().required(),
         description:Joi.string().required(),
         price:Joi.number().required(),
         VAT:Joi.number().required(),
         pricePerChannel:Joi.boolean().required(),
         category:Joi.objectId(),
         modifierGroup:Joi.array()
   })
   return schema.validate(payload);
}

exports.modifierValidationBody = (payload)=>{
   const schema = Joi.object({
      name:Joi.string().required(),
      items:Joi.array()
   })
   return schema.validate(payload);
}
