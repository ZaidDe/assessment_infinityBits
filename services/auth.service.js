const { Users } = require('../models')
const log = console.log
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const register = async ({ name, email, password, address, phoneNumber }) => {

    try {
        let payload = {};
        (name) && (payload['name'] = name);
        (email) && (payload['email'] = email);
        (password) && (payload['password'] = password);
        (address) && (payload['address'] = address);
        (phoneNumber) && (payload['phoneNumber'] = phoneNumber);

        let user = await Users.query().insert(payload).returning()

        return {
            success: true,
            message: 'Successfully registered user',
            data: {
                username: user.name
            }
        }
    } catch (error) {
        log(`AuthService Register error: `, error.message)
        return {
            success: false,
            message: 'Server Error, Cannot Register User at the moment'

        }
    }
}

const login = async ({ email, password }) => {
    try {
        let user = await User.query().select().first().where({ email })

        if (!user) {
            return {
                success: false,
                message: 'Incorrect credentials'
            }
        }

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) {
            return {
                success: false,
                message: 'Invalid credentials'
            }
        }

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 3000
        })


        return {
            success: true,
            message: 'Successfully logged in user',
            data: {
                token: token
            }
        }
    } catch (error) {
        log(`AuthService Login error: `, error.message)
        return {
            success: false,
            message: 'Server Error, Cannot Login User at the moment'

        }
    }
}

module.exports = {
    register,
    login
}