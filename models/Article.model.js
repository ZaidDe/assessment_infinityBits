const { Model } = require('objection')
const { format } = require('date-fns')

class Articles extends Model {
    $beforeInsert() {
        this.created = format(new Date, 'yyyy-MM-dd HH:mm:ss')
    }
    static get tableName() {
        return 'articles'
    }

    static get relationMappings() {
        const Users = require('./User.model')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'articles.userId',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Articles