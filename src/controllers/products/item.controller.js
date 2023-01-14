const Item = require('../../models/item');
const {itemValidationBody} = require('./products.validation');

const ItemController = {
    async createItem(req, res){
        const {error, value} = itemValidationBody(req.body);
        if(error){
            return res.status(400).json({
                status:'failure',
                error
            })
        }
        const item = await Item.create(value);
        return res0.status(201).json({
            status:'success',
            message:'Item successfully created',
            item
        })
    },
    async getItems(req, res){
        const item = await Item.find({});
        if(!item){
            return res.status(400).json({
                status:'failure',
                message:'No Item found'
            })
        }
        return res.status(200).json({
            status:'success',
            item
        })
    },
    async getItem(req, res){
        const item = await Item.findOne({_id:req.query.id})
        if(!item){
            return res.status(400).json({
                status:'failure',
                message:'No Item found'
            })
        }
        return res.status(200).json({
            status:'success',
            item
        })
    }
}

module.exports = ItemController;
