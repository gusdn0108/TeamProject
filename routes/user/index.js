const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')




app.set('view engine', 'html')
nunjucks.configure('views', {express:app})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//

const addUser = require('./joinController.js')
const loginUser = require('./loginController.js')
const {alertmove} = require('.././util/alertmove.js')
const pool = require('../../db.js')
const loginController = require('./loginController')
const Auth = require('.././util/auth.js')

//

router.get('/login', loginController.login)

router.post('/login', loginController.loginAction)

//

router.get('/join', loginController.join)

router.post('/join', loginController.joinAction)

//

router.get('/profile', Auth.checkUser, loginController.profile)

//

router.get('/welcome', loginController.welcome)

//

router.get('/logout', loginController.logout)

//

module.exports = router
