const uuid = require('uuid').v4;
const moment = require('moment');
const sgMail = require('./sendgrid');
const Token = require('../models/token');
const localLink = `http://localhost:3000/api/v1`
const developLink = `https://pavery.onrender.com/api/v1`


exports.emailVerification = async (user) => {
    let hash = uuid();
    hash = hash.replace(/-/g, '');
    const expiresIn = moment().add(30, 'minutes').format()
    const token = await Token.create({
        user: user._id,
        hash,
        expiresIn,
        type: 'email verification'
    })
    const links = `${developLink}/auth/verify-email/${token.hash}`;
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Email Verification',
        text: links,
        html:`<p>Please verify your email with the link below</p>
        <p>${links}</p>`
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
    const link = `${localLink}/auth/update-password/${token.hash}`;
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Reset Password',
        text: link,
        html:`<p>Please clink the link to reset password</p>
        <p>${link}</p>
        `
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