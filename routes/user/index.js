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
const {alertmove} = require('./alertmove.js')
const pool = require('../../db.js')

//

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
    let birthday = req.body.birth_year + req.body.birth_month + req.body.birth_day;
    let joinGender = req.body.gender
    let joinPhone = req.body.phone
    let joinMobile = req.body.mobile

    console.log(joinId)
    console.log(joinPw)
    console.log(joinName)
    console.log(birthday)

    // let checkId = `select * from userAccount where id = ${joinId}`
    let checkNick = `select * from userAccount where id='${joinId}'`
    let addData = `insert into userAccount(id, pw, name, nickname, birth, gender,phone, mobile,userlevel) values('${joinId}','${joinPw}', '${joinName}', '${joinNickname}','${birthday}', '${joinGender}', '${joinPhone}', '${joinMobile}',3)`

    //addUser(joinId, joinPw, joinName, joinNickname, joinBirthday, joinBirthday, joinGender, joinPhone, joinMobile)

    pool.getConnection( (error,conn)=> {
        if ( error ) throw error
        conn.query(checkNick,(err,result)=>{
            console.log(result)
            if(result.length == 0) {
                console.log('회원가입 성공')
                conn.query(addData,(err,result)=>{
                    if(err) throw err
                    console.log(`insert 문 진입`)
                    alertmove('/', '회원가입이 완료되었습니다.')
                })
            } else {
                console.log('회원가입 실패')
                res.send('회원가입 실패')
                alertmove('/user/login',' 중복된 닉네임입니다.')
            }
        })
        // conn.query(checkId, (err, result) => {
        //     if(result.length == 0 ) {
        //         conn.query(checkNick,
        //             (err, result) => {
        //                 if (result.length == 0) {
        //                     console.log('회원가입 성공')
        //                     conn.query(addData, (err, result) => {
        //                         if(!err) {
        //                             console.log(result)
        //                             alertmove('/', '회원가입이 완료되었습니다.')
        //                         }
        //                         else {throw err}
        //                     })
        //                 }
        //                 else {
        //                     console.log('닉네임 중복')
        //                     alertmove('/user/login',' 중복된 닉네임입니다.')
        //                 }
        //             })
        //     }
        //     else {
        //         console.log('중복된 id입니다.')
        //         alertmove('/user/login', '중복된 id입니다.')
        //     }
        // })
    })

    // conn.release()

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

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/','로그아웃 되었습니다.'))
})




module.exports = router