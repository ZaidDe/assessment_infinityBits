const log = console.log
const Article = require('../models/Article.model')

const articleService = (user) => {

    const postArticle = async ({ name, description, body }) => {
        try {
            let payload = {};
            (name) && (payload['name'] = name);
            (description) && (payload['description'] = description);
            (body) && (payload['body'] = body);
            payload['userId'] = user.id

            let article = await Article.query().insert(payload).returning()

            return {
                success: true,
                message: 'Successfully registered user',
                data: {
                    article: article
                }
            }
        } catch (error) {
            log(`ArticleService postArticle error: `, error.message)
            return {
                success: false,
                message: 'Could not create post'

            }
        }
    }

    const getArticles = async ({ limit = 10, offset = 0, searchText = '' }) => {
        try {

            let articles = await Article.query().select().modify(builder => {

                if (searchText !== '') {
                    builder.where(searchBuilder => {
                        searchBuilder.orWhere('name', 'ilike', `%${searchText}%`);
                        searchBuilder.orWhere('description', 'ilike', `%${searchText}%`);
                    })
                }
            }).limit(limit).offset(offset).withGraphFetched({
                user: true
            })

            return {
                success: true,
                message: 'Successfully registered user',
                data: {
                    articles: articles
                }
            }
        } catch (error) {
            log(`ArticleService getArticle error: `, error.message)
            return {
                success: false,
                message: 'Could not get posts'

            }
        }
    }

    return {
        postArticle,
        getArticles
    }

}

module.exports = articleService