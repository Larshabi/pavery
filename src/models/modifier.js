const {Schema, model} = require('mongoose');
const modifierSchema = new Schema({
    name:String,
    isAvailable:{
        type:Boolean,
        default:false
    },
    items:[
        {
            type:Schema.Types.ObjectId,
            ref:'Item'
        }
    ]
},
{
    timestamps:true
});
const Modifier = model('Modifier', modifierSchema);
module.exports = Modifier;