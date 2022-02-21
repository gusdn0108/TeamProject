const express = require(`express`)
const router = express.Router()
const boardRouter = require(`./board`)
const userRouter = require('./user/index.js')
const mainController = require(`./main.Controller`)

router.use('/user', userRouter)
router.use(`/board`,boardRouter)
router.get(`/`,mainController.main)

module.exports = router