const Store = require('../../models/store');
const User = require('../../models/user');
const {storeValidationBody} = require('./store.validation');
const cloudinary = require('../../utils/cloudinary');

const StoreController = {
    async createStore(req, res){
        const {error, value} = storeValidationBody(req.body);
        if(error){
            return res.status(400).json({
                status:'error',
                error
            })
        }
        if(req.files){
            const {tempFilePath} = req.files.file;
            const response = await cloudinary.uploader.upload(tempFilePath);
            const url = response.secure_url;
            value['image'] = url 
        }
        const user = await User.findOne({email:req.user.email});
        value['user'] = user._id;
        const store = await Store.create(value);
        return res.status(201).json({
            status:'success',
            message:'store successfully created',
            store
        })
},
async getStore(req, res){
    const store = await Store.findOne({_id:req.params.id})
    if(!store){
        return res.status(400).json({
            status:'error',
            message:'Store not found'

        })
    }
    return res.status(200).json({
        status:'success',
        store
    })
},
async getStores(req, res){
    const store = await Store.find({});
    if(!store){
        return res.status(400).json({
            status:'error',
            message:'No store found'
        })
    }
    return res.status(200).json({
        status:'success',
        store
    })
},
async updateStore(req, res){
    if(req.files){
        const {path} = req.files;
        const response = await cloudinary.uploader.upload(path);
        const url = response.secure_url;
        req.body['image'] = url
    }
    const store = await Store.findByIdAndUpdate({_id:req.params.id}, req.body);
    if(!store){
        return res.status(400).json({
            status:'error',
            message:'Store not found'
        });
    }
    return res.status(200).json({
        status:'success',
        message:'Store is succesfully updated'
    })
}
}
module.exports = StoreController