const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')

const session = require('express-session')

const Memorystore = require('memorystore')(session)

app.set('view engine', 'html')
nunjucks.configure('views', {express:app})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//

const addUser = require('./joinController.js')
const joinUser = require('./loginController.js')
const alertmove = require('./alertmove.js')
const pool = require('../../db.js')

//

let loginresult
let userInfo = []

let sessionObj = {
    secret: 'admin',
    resave: false,
    saveUninitialized:true,
    store:new Memorystore({checkperiod: 30*60*1000}),
    cookie: {
        maxAge: 30*60*1000
    }
}

// memorystroe가 아닌 filestore를 사용?

app.use(session(sessionObj))


const Auth = (req, res, next) => {
    let {user} = req.session
    if(user != undefined) {
        next()
    }
    else {
        res.send(alertmove('/user/login', '로그인 해주세요!'))
    }
}

// 세션 기능 어떻게 하지..? ㅠㅠ

router.get('/login', (req, res) => {
    res.render('user/login.html')
})

router.post('/login', (req, res) => {
    let loginId = req.body.id
    let loginPw = req.body.pw
    
    loginUser(loginId, loginPw)
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

    let checkId = `select * from userAccount where id = ${joinId}`
    let checkNick = `select * from userAccount where nickname = ${joinNickname}`
    let addData = `insert into members(id, pw, name, nickname, birth, gender, phone, mobile) values('${id}', 
    ${pw}, ${name}, ${birthday}, ${gender}, ${phone}, ${mobile})`

    //addUser(joinId, joinPw, joinName, joinNickname, joinBirthday, joinBirthday, joinGender, joinPhone, joinMobile)

    pool.getConnection((err, conn) => {
        conn.query(checkId, (err, result) => {
            if(result.length == 0 ) {
                conn.query(checkNick,
                    (err, result) => {
                        if (result.length == 0) {
                            console.log('회원가입 성공')
                            conn.query(addData, (err, result) => {
                                if(!err) {
                                    console.log(result)
                                    alertmove('/', '회원가입이 완료되었습니다.')
                                }
                                else {throw err}
                            })
                        }
                        else {
                            console.log('닉네임 중복')
                            alertmove('/user/login',' 중복된 닉네임입니다.')
                        }
                    })
            }
            else {
                console.log('중복된 id입니다.')
                alertmove('/user/login', '중복된 id입니다.')
            }
        })
    })

    conn.release()

})

//

router.get('/profile', Auth, (req,res)=>{
    let userId = id
    let userName = name
    let userGender = gender
    let userPhone = phone
    let userMobile = mobile
    let userNickname = Nickname

    // req.session.id?

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

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/','로그아웃 되었습니다.'))
})




module.exports = router