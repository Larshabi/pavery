const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    phoneNumber: String,
    password: String,
    lastLogin: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});


const User = model('User', userSchema);


module.exports = User;