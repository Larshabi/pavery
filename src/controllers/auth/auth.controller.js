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
        // await emailVerification(user)
        console.log('done')
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
        console.log(user);

        const filteredPayload = filterJwtPayload(user);
        const accessToken = encode(filteredPayload, process.env.accessTokenSecret, '2h')


        const tokens = {
            accessToken,
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
        return res.status(200).json({ message: 'User Verified', user })
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
        EmailVerification(user);
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
        if (!moment().isAfter(moment(token.expiresIn))) {
            return res.status(400).json({ message: 'Token Expired' })
        }
        const salt = bcrypt.gensalt();
        const hash = bcrypt.hash(req.body.password, salt);

        const user = await User.findOneAndUpdate({ _id: token.user }, { password: hash })
        return res.status(200).json({ message: 'Password updated' })
    }

}


module.exports = AuthController;