const {Schema, model} = require('mongoose');
const storeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    name:String,
    description:String,
    tags:String,
    paveryStoreLink:String,
    webLink:String,
    whatsappLink:String,
    instagramLink:String,
    facebookLink:String,
    buttonBackground:String,
    buttonTextColor:String,
    pageBackroundColor:String,
    image:String
},
{
    timestamps:true
}
);

const Store = model('Store', storeSchema);
module.exports = Store

