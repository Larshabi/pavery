const Category = require('../../models/categories');
const { categoriesValidationBody } = require('./products.validation');

const CategoryController = {
    async createCategory(req, res){
        const {value, error} = categoriesValidationBody(req.body);
        if(error){
            return res.status(400).json({
                status:'error',
                message:error.message
            })
        }
        let category = await Category.findOne({name:value.name})
        if(category){
            return res.status(400).json({
                status:'error',
                message:'category exists'
            })
        }
        category = await Category.create(value);
        return res.status(201).json({
            status:'success',
            message:'Category successfully created',
            category
        })
    },
    async getCategories(req, res){
        const category = await Category.find({})
        if (!category){
            return res.status(400).json({
                status:'error',
                message:'No category found'
            })
        }
        return res.status(200).json({
            status:'success',
            category
        })
    },
    async getACategory(req, res){
        const category = await Category.findById({_id:req.params.id})
        if (!category){
            return res.status(400).json({
                status:'error',
                message:'No category found'
            })
        }
        return res.status(200).json({
            status:'success',
            category
        })
    },
    async updateCategory(req, res){
        const category = await Category.findByIdAndUpdate({_id:req.params.id}, {...req.body})
        if (!category){
            return res.status(400).json({
                status:'error',
                message:'No category found'
            })
        }
        return res.status(200).json({
            status:'success',
            category
        })
    }
}

module.exports = CategoryController