const router = require('express').Router()
const log = console.log
const controller = require('../controller/auth.controller')
const { hashPassword } = require('../middlewares')


router.post('/register', hashPassword, async (req, res) => {

    log(`[REGISTER ROUTE]: data`)
    const result = await controller.register(req.body)
    res.send(result)
})

router.post('/login', async (req, res) => {
    log(`[LOGIN ROUTE]: data`)
    const result = await controller.login(req.body)
    res.send(result)
})


module.exports = router