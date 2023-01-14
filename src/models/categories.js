const {Schema, model} = require('mongoose');
const categorySchema = new Schema({
    name:String,
    description:String,
    isAvailable:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

const Category = model('Category', categorySchema);

module.exports = Category;

