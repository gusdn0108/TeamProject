const express = require(`express`)
const router = express.Router()
const adminController = require('./adminController.js')


router.get('/', adminController.list)

router.get('/update', adminController.update)

router.post('/update', adminController.updateAction)

router.post('/delete', adminController.userDelete)

router.post('/re-active', adminController.reActive)

router.post('/post-delete', adminController.postDelete)


module.exports = router