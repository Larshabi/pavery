const User = require('../../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { validateRegisterBody, validateLoginBody } = require('./auth.validation');
const { emailVerification, resetEmail } = require('../../utils/email-verification');
const moment = require('moment');
const Token = require('../../models/token');
const {encode, validate} = require('../../utils/jwt');
const {filterJwtPayload} = require('../../helpers/index');



const AuthController = {
    async userRegistration(req, res) {
        const { error, value } = validateRegisterBody(req.body);
        if (error) {
            return res.status(400).json({
                error
            })
        }
        let user = await User.findOne({ email: value.email })
        if (user) {
            return res.status(400).json({
                status: 'error',
                message: 'email address already taken'
            })
        }
        fullName = value.fullName.split(' ')

        const [firstName, lastName] = fullName


        delete value.fullName

        user = await User.create({...value, firstName: firstName, lastName: lastName })
        await emailVerification(user)
        user = _.pick(user, ['_id', 'email', 'phoheNumber', 'firstName', 'lastName'])



        return res.status(201).json({
            status: 'success',
            message: 'user registration successful',
            user
        })
    },
    async userLogin(req, res) {
        const { error, value } = validateLoginBody(req.body)
        if (error) {
            return res.status(400).json({
                error
            })
        }
        let user = await User.findOne({ email: value.email })
        if (!user) {
            return res.status(400).json({
                status: 'error',
                mesage: 'Email not registered'
            })
        }
        if (!user.isVerified) {
            return res.status(400).json({
                status: 'error',
                message: 'Please verify your email'
            })
        }

        const isMatch = await bcrypt.compare(value.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Incorrect password'
            })
        }

        user = _.pick(user, ['firstName', 'lastName', 'email', 'phoneNumber', 'isActive', 'isVerified', 'lastLogin']);
        

        const filteredPayload = filterJwtPayload(user);
        // const encodeAccessSecret = Buffer.from(process.env.accessTokenSecret).toString('base64');
        // const encodeRefreshSecret = Buffer.from(process.env.refreshTokenSecret).toString('base64');
        const accessToken = encode(filteredPayload, process.env.accessTokenSecret, process.env.accessTokenExpiresIn)
        const refreshToken = encode(filteredPayload, process.env.refreshTokenSecret, process.env.refreshTokenExpiresIn)
        
        const tokens = {
            accessToken,
            refreshToken
        }

        const now = new Date()
        await User.updateOne({ _id: user._id }, { lastLogin: now })

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            user,
            tokens
        })
    },
    async verifyEmail(req, res) {
        const token = await Token.findOne({ hash: req.params.hash });
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        if (moment().isAfter(moment(token.expiresIn))) {
            return res.status(400).json({ message: 'Token expired' })
        }
        const user = await User.findOneAndUpdate({ _id: token.user }, { isVerified: true });
        return res.status(200).json({ message: 'User Verified' })
    },
    async verifyTokenValidity(req, res) {
        const token = await Token.findOne({ hash: req.params.hash })
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        if (moment().isAfter(moment(token.expiresIn))) {
            return res.status(400).json({ message: 'Expired Token' })
        }
        return res.status(200)
    },
    async refreshEmail(req, res) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Email not registered' });
        }
        await emailVerification(user);
        return res.json({ message: 'Email verification mail sent' })
    },
    async resetPassword(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: 'Email not registered' });
        }
        resetEmail(user);
        return res.status(200).json({
            message: 'Password reset email sent'
        })
    },
    async updatePassword(req, res) {
        const token = await Token.findOne({ hash: req.params.hash })
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        if (moment().isAfter(moment(token.expiresIn))) {
            return res.status(400).json({ message: 'Token Expired' })
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOneAndUpdate({ _id: token.user }, { password: hash })
        return res.status(200).json({ message: 'Password updated' })
    },
    async refreshToken(req, res){
        const payload = validate(req.body.token, process.env.refreshTokenSecret);
        if (Date.now() >= payload.exp * 1000) {
            return res.status(400).json({ message: 'Refresh Token Expired' });
        }
        let user = await User.findOne({_id:payload._id})
        user = _.pick(user, ['_id', 'email'])
        const tokens = {
            accessToken : encode(user, process.env.accessTokenSecret, process.env.accessTokenExpiresIn),
            refreshToken: encode(user, process.env.refreshTokenSecret, process.env.refreshTokenExpiresIn)
        }
        return res.json({
            status: 'success',
            message: 'token refreshed',
            tokens,
          });
    }

}


module.exports = AuthController;