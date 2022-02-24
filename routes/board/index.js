const express = require(`express`)
const router = express.Router()
const boardController = require(`./board.Controller`)
const Auth = require(`../util/auth.js`)

router.get(`/list`, boardController.list)

router.get(`/write`,boardController.write)
router.post(`/write`,boardController.writePost)

router.get(`/view`,boardController.view)

router.post(`/delete`,Auth.checkLevel,boardController.deletePost)

router.get(`/update`,Auth.checkLevel,boardController.update)
router.post(`/update`,boardController.updatePost)


module.exports = router