const Item = require('../../models/item');
const {itemValidationBody} = require('./products.validation');
const {parse} = require('json2csv');
const fs = require('fs');

const ItemController = {
    async createItem(req, res){
        const {error, value} = itemValidationBody(req.body);
        if(error){
            return res.status(400).json({
                status:'error',
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
                status:'error',
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
                status:'error',
                message:'No Item found'
            })
        }
        return res.status(200).json({
            status:'success',
            item
        })
    },
    async downloadTemplate(req, res){
        let fields = Object.keys(Item.schema.obj);
        fields = [
            {
                name:'',
                internalName:'',
                description:'',
                price:'',
                VAT:'',
                pricePerChannel:'Yes or No',
                category:'',
                isModifiedGroup:'Yes or No',
                isAvailable:'Yes or No',
                modifiedGroup:''
            }
        ]
        const csv = parse(fields)
        fs.writeFile("item.csv", csv, function(err){
            if(err){
                return res.status(400).json({
                    err
                })
            }
            console.log('File saved')
        })
        // res.set("Content-Disposition", "attachment;filename=item.csv");
        // res.set("Content-Type", "application/octet-stream");
        res.attachment("item.csv")
        res.send(csv);
    },
    async updateItem(req, res){
        const item = await Item.findOneAndUpdate({_id:req.params.id}, {...req.body})
        if(!item){
            return res.status(400).json({
                status:'error',
                message:'Item not found'
            })
        }
        return res.status(200).json({
            status:'success',
            message:'Item successfully updated'
        })
    }
}

module.exports = ItemController;
