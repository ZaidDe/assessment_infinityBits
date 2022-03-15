const Joi = require('joi')
const service = require('../services/auth.service')
log = console.log

const register = async (payload) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().optional(),
        phoneNumber: Joi.number().optional()
    });

    const isNotValid = schema.validate(payload).error;

    if (isNotValid) {
        log('AuthController Register error: Validation Failed')
        return {
            success: false,
            message: isNotValid.message
        }
    }

    let result = await service.register(payload)
    return result
}

const login = async (payload) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const isNotValid = schema.validate(payload).error;

    if (isNotValid) {
        log('AuthController Login error: Validation Failed')
        return {
            success: false,
            message: isNotValid.message
        }
    }

    let result = await service.login(payload)
    return result
}

module.exports = {
    register,
    login
}