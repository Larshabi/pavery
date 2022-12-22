const {sign, verify} = require('jsonwebtoken');

exports.encode = (payload, secret, expiresIn) => sign(payload, secret, {expiresIn});

exports.validate = (token, secret)=>verify(token, secret);