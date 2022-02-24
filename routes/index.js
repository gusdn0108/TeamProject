const express = require(`express`)
const app = express()
const router = express.Router()
const Auth = require(`./util/auth.js`)

const boardRouter = require(`./board`)
const userRouter = require('./user/index.js')
const mainController = require(`./main.Controller`)
const adminRouter = require('./admin')

app.use(express.urlencoded({extended:true}))

router.use('/user', userRouter)
router.use(`/board`, Auth.checkUser, boardRouter)
router.use('/admin', adminRouter)
router.get(`/`, mainController.main)




module.exports = router