const env = process.env.NODE_ENV || 'development'
const knexfile = require('./knexfile')[env]
const { Model } = require('objection')



const db = require('knex')(knexfile)
Model.knex(db)


module.exports = db