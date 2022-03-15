const Joi = require('Joi')


const articleController = (user) => {

    const postArticle = async (payload) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            body: Joi.string().optional()
        });

        const isNotValid = schema.validate(payload).error;

        if (isNotValid) {
            log('ArticleController postArticle error: Validation Failed')
            return {
                success: false,
                message: isNotValid.message
            }
        }

        let result = await service(user).postArticle(payload)
        return result
    }

    const getArticles = async (payload) => {

        const schema = Joi.object().keys({
            limit: Joi.number().optional(),
            offset: Joi.number().optional(),
            searchText: Joi.string().optional(),
        });

        const isNotValid = schema.validate(payload).error;

        if (isNotValid) {
            log('ArticleController postArticle error: Validation Failed')
            return {
                success: false,
                message: isNotValid.message
            }
        }

        let result = await service(user).getArticles(payload)
        return result
    }

    return {
        postArticle,
        getArticles
    }
}

module.exports = articleController


