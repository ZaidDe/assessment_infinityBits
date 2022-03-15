const { Model } = require('objection')
const { format } = require('date-fns')

class User extends Model {
    // $beforeInsert() {
    //     this.created = format(new Date, 'yyyy-MM-dd HH:mm:ss')
    // }
    static get tableName() {

        return 'users'
    }
    static get relationMappings() {
        const Articles = require('./Article.model')
        return {
            articles: {
                relation: Model.HasManyRelation,
                modelClass: Articles,
                join: {
                    from: 'users.id',
                    to: 'articles.userId'
                }
            }
        };
    }
}

module.exports = User