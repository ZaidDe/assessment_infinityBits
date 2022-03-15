const { DB_HOST,
  DB_USER,
  DB } = process.env;
const { knexSnakeCaseMappers } = require('objection')

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      database: DB,
      timezone: "+05:00",

    },
    pool: {
      min: 30,
      max: 30,
      idleTimeoutMillis: 5 * 1000,
      acquireTimeoutMillis: 3 * 1000,
    },
    ...knexSnakeCaseMappers()

  }

};