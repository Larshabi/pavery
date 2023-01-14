const {Schema, model} = require('mongoose');
const modifierSchema = new Schema({
    name:String,
    isAvailable:{
        type:Boolean,
        default:false
    },
},
{
    timestamps:true
});
const Modifier = model('Modifier', modifierSchema);
module.exports = Modifier;