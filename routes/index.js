const express = require(`express`)
const router = express.Router()
const boardRouter = require(`./board`)
const mainController = require(`./main.Controller`)

router.use(`/board`,boardRouter)
router.get(`/`,mainController.main)

module.exports = router