const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')

// const session = require('express-session')

// const Memorystore = require('memorystore')(session)

app.set('view engine', 'html')
nunjucks.configure('views', {express:app})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//

const addUser = require('./joinController.js')
const loginUser = require('./loginController.js')
const {alertmove} = require('../util/alertmove.js')
const pool = require('../../db.js')
const loginController = require('./loginController')


const Auth = (req, res, next) => {
    let {user} = req.session
    if(user != undefined) {
        next()
    }
    else {
        res.send(alertmove('/user/login', '로그인 해주세요!'))
    }
}

router.get('/login', loginController.login)

router.post('/login', loginController.loginAction)

router.get('/join',(req,res)=>{
    res.render('user/join')
})

router.post('/join',(req,res)=>{
    let joinId = req.body.id
    let joinPw = req.body.pw
    let joinName = req.body.name
    let joinNickname = req.body.nickname
    let birthday = req.body.birth_year + req.body.birth_month + req.body.birth_day;
    let joinGender = req.body.gender
    let joinPhone = req.body.phone
    let joinMobile = req.body.mobile
    

    console.log(joinId,joinPw,joinName,birthday)

    let checkId = `select * from userAccount where id='${joinId}'`
    let addData = `insert into userAccount(id, pw, name, nickname, birth, gender, phone, mobile, userlevel) values('${joinId}','${joinPw}', '${joinName}', '${joinNickname}','${birthday}', '${joinGender}', '${joinPhone}', '${joinMobile}',3)`

    pool.getConnection( (error,conn)=> {
        if ( error ) throw error
        conn.query(checkId,(err,result)=>{
            console.log(result)
            if(result.length == 0) {
                console.log('회원가입 성공')
                conn.query(addData,(err,result)=>{
                    if(err) throw err
                    console.log(`insert 문 진입`)
                    res.send(alertmove('/user/welcome', '회원가입이 완료되었습니다.'))
                })
            } else {
                console.log('회원가입 실패')
                res.send(alertmove('/user/login','중복된 닉네임입니다.'))
            }
        })
        conn.release()
    })
})

//

router.get('/profile', Auth, (req,res)=>{
    let userId = id
    let userName = name
    let userGender = gender
    let userPhone = phone
    let userMobile = mobile
    let userNickname = Nickname


    if ( user != undefined ) {
        res.render('user/profile', {
            id: userId,
            name: userName,
            gender: userGender,
            phone: userPhone,
            mobile:userMobile,
            nickname:userNickname
        })
    }
    else {
        res.send(alertmove('/', '로그인 해주세요!'))
    }
})

//
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/','로그아웃 되었습니다.'))
})

module.exports = router