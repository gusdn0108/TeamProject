const express = require('express')
const router = express.Router()

const loginController = require('./user.Controller.js')
const Auth = require('.././util/auth.js')

//

router.get('/login', loginController.login)
router.post('/login', loginController.loginAction)

router.get('/join', loginController.join)
router.post('/join', loginController.joinAction)

router.get('/profile', Auth.checkUser, loginController.profile)

router.get('/welcome', loginController.welcome)

router.get('/logout', loginController.logout)



module.exports = router
