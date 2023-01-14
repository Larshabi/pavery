const {Schema, model} = require('mongoose');
const itemSchema = new Schema({
    name:String,
    internalName:String,
    description:String,
    price:Number,
    VAT:Number,
    pricePerChannel:{
        type: Boolean,
        default:false
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    isAvailable:{
        type:Boolean,
        default:false
    },
    isModifiedGroup:{
        type:Boolean,
        default:false
    },
    modifiedGroup:[String]
},
{
    timestamps:true
});

const Item = model('Item', itemSchema);
module.exports = Item;