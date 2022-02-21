const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')

app.set('view engine', 'html')
nunjucks.configure('views', {express:app})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//

const addUser = require('./joinController.js')
const alertmove = require('./alertmove.js')

//



router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/login', (req, res) => {
    let { userid, userpw} = req.body
    let [item] = user.filter(v => (v.userid == userid && v.userpw == userpw))

    if(item != undefined) {
        req.session.user={...item}
        res.redirect('/')
    }
    else {
        res.send(alertmove('/user/login', 'id/pw를 확인해주세요.'))
    }
    
})

//

router.get('/join',(req,res)=>{
    res.render('user/join')
})

router.post('/join',(req,res)=>{
    let joinId = req.body.id
    let joinPw = req.body.pw
    let joinName = req.body.name
    let joinNickname = req.body.nickname
    let joinBirthday = req.body.Birthday
    let joinGender = req.body.gender
    let joinPhone = req.body.phone
    let joinMobile = req.body.Mobile

    addUser(joinId, joinPw, joinName, joinNickname, joinBirthday, joinBirthday, joinGender, joinPhone, joinMobile)
    res.send(alertmove('/', '회원가입이 완료되었습니다.'))

})

//

router.get('/profile',(req,res)=>{
    let userId = id
    let userName = name
    let userGender = gender
    let userPhone = phone
    let userMobile = mobile
    let userNickname = Nickname

    res.render('user/profile', {
        id: userId,
        name: userName,
        gender: userGender,
        phone: userPhone,
        mobile:userMobile,
        nickname:userNickname
    })
})


module.exports = router