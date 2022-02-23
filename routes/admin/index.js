const express = require(`express`)
const router = express.Router()
const adminController = require('./adminController.js')




router.get('/', adminController.list)

router.get('/update', adminController.update)


module.exports = router