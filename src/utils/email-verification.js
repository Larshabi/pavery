const uuid = require('uuid').v4;
const moment = require('moment');
const sgMail = require('./sendgrid');
const Token = require('../models/token');




exports.emailVerification = async(user) => {
    let hash = uuid();
    console.log(hash)
    hash = hash.replace(/-/g, '');
    const expiresIn = moment().add(30, 'minutes').format()
    console.log(user)
    const token = await Token.create({
        user: user._id,
        hash,
        expiresIn,
        type: 'email verification'
    })
    const link = `http://localhost:8000/api/v1/verify-email/${token.hash}`;
    console.log(user.email)
    const msg = {
        to: user.email,
        from: 'chisom.okafor@comeriver.com',
        subject: 'Email Verification',
        text: 'Okay chisom I have heard you',
        html: `<h1>Hello Chisom</h1>`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error);
        })
}


exports.resetEmail = async(user) => {
    let hash = uuid();
    console.log(hash)
    hash = hash.replace(/-/g, '');
    const expiresIn = moment().add(15, 'minutes').format()

    const token = await Token.create({
        user: user._id,
        hash,
        expiresIn,
        type: 'reset password'
    })
    const link = `http://localhost:8000/api/v1/update-password/${token.hash}`;
    const msg = {
        to: user.email,
        from: 'olalekanlasabi@gmail.com',
        subject: 'Reset Password',
        text: link
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error);
        })
}