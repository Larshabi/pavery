const { model, Schema } = require('mongoose');

const TokenSchema = new Schema({
    type: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiresIn: Date,
    hash: String
}, {
    timestamps: true
})


module.exports = model('Token', TokenSchema);