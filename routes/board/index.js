const express = require(`express`)
const router = express.Router()
const boardController = require(`./board.Controller`)

router.get(`/list`,boardController.list)


router.get(`/write`,boardController.write)
router.post(`/write`,boardController.writePost)


router.get(`/view`,boardController.view)



router.get(`/delete`,boardController.deletePost)

router.get(`/update`,boardController.update)
router.post(`/update`,boardController.deletePost)


module.exports = router