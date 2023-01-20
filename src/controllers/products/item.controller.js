const Item = require('../../models/item');
const {itemValidationBody} = require('./products.validation');
const {parse} = require('json2csv');
const fs = require('fs');
const csv = require('fast-csv');

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
        return res.status(201).json({
            status:'success',
            message:'Item successfully created',
            item
        })
    },
    async getItems(req, res){
        const item = await Item.find({}).populate(
            { path: 'modifierGroup', select: 'name' }
            );
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
        const item = await Item.findOne({_id:req.params.id}).populate(
        { path: 'modifierGroup', select: 'name' }
        );
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
        const csvFile= parse(fields);
        res.attachment("item.csv");
        res.send(csvFile);
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
    },
    async upload(req, res){
        if(!req.files){
            return res.status(400).json({
                status:'error',
                message:'No file was uploaded'
            })
        }
        const itemFile = req.files.file;

    }
}

module.exports = ItemController;
