const Modifier = require('../../models/modifier');
const {modifierValidationBody} = require('./products.validation');

const ModifierController = {
    async modifierCreate(req, res){
        const {error, value} = modifierValidationBody(req.body);
        if(error){
            return res.status(400).json({
                status:'error',
                error
            })
        }
        let modifier = await Modifier.findOne({name:value.name})
        if(modifier){
            return res.status(400).json({
                status:'error',
                message:'Modified group exists'
            })
        }
        modifier = await Modifier.create(value)
        return res.status(201).json({
            status:'success',
            message:'Modified group created',
            modifier
        })
    },
    async getModifiers(req, res){
        const modifiers = await Modifier.find({})
        if(!modifiers){
            return res.status(400).json({
                status:'error',
                message:'There are no modified groups'
            })
        }
        return res.status(200).json({
            status:'success',
            modifiers
        })
    },
    async getAmodifier(req,res){
        const { id } = req.params;
        const modifier = await Modifier.findOne({_id:id})
        if(!modifier){
            return res.status(404).json({
            status:'error',
            message:'Modified group not found'
            })
        }
        return res.status(200).json({
            status:'success',
            modifier
        })
    },
    async updateModifier(req, res){
        let modifier = await Modifier.findByIdAndUpdate({_id:req.params.id}, {...req.body})
        if(!modifier){
            return res.status(400).json({
                status:'error',
                message:'Modified group not found'
            })
        }
        return res.status(200).json({
            status:'success',
            message:'Modified group successfully updated'
        })
    }
}
module.exports= ModifierController;