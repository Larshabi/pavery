const User = require('../../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { validateRegisterBody, validateLoginBody } = require('./auth.validation');



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
        // if (!user.isVerified) {
        //     return res.status(400).json({
        //         status: 'error',
        //         message: 'Please verify your email'
        //     })
        // }

        const isMatch = await bcrypt.compare(value.password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Incorrect password'
            })
        }
        const now = new Date()
        await User.updateOne({ _id: user._id }, { lastLogin: now })

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
        })
    }

}


module.exports = AuthController;