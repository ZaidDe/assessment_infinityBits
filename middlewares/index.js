const bcrypt = require('bcrypt');
const { Users } = require('../models')
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

async function hashPassword(req, res, next) {
    if (!req.body || !req.body.password) {
        return res.status(404).json({
            success: false,
            message: 'password not found'
        })
    }


    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(req.body.password, salt)

    req.body.password = hash
    next();
}

async function isAuth(req, res, next) {
    try {
        if (!req.headers.authorization) return res.status(403).send('No credentials sent!');
        const authHeaderParts = String(req.headers.authorization).split(' ');
        if (authHeaderParts.length <= 0 || authHeaderParts.length > 2) return res.status(403).send('No credentials sent!');
        if (authHeaderParts[0] !== 'JWT') return res.status(403).send('No credentials sent!');

        let decoded = jwt.verify(authHeaderParts[1], process.env.JWT_SECRET)

        const foundUser = await User.query().select().first().where({ id: decoded.id })
        if (!foundUser) return res.status(403).send('Not Authorized');

        let userData = {};
        userData['id'] = foundUser.id
        userData['name'] = foundUser.name
        req.user = userData;
        return next();

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}



module.exports = {
    hashPassword,
    isAuth
}