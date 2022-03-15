const router = require('express').Router()
const log = console.log
const controller = require('../controller/article.controller')
const { isAuth } = require('../middlewares')


router.post('/', isAuth, async (req, res) => {

    log(`[POST ARTICLES ROUTE]: data`)
    const result = await controller(req.user).postArticle(req.body)
    res.send(result)
})

router.get('/', isAuth, async (req, res) => {
    log(`[GET ARTICLES ROUTE]: data`)
    const result = await controller(req.user).getArticles(req.query)
    res.send(result)
})


module.exports = router