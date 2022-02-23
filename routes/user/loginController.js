const res = require("express/lib/response")
const router = require(".")
const { connect } = require(".")
const pool = require("../../db")
const { alertmove } = require("../util/alertmove")
const bodyParser = require('body-parser')

// 로그인 get 
exports.login = (req,res) => {
    res.render('user/login.html')
} 

// 로그인 post
exports.loginAction = (req,res) => {
    const {id,pw} = req.body
    const loginData = {id,pw}
    let loginSql = `select * from userAccount where id = '${id}' and pw = '${pw}';`
    pool.getConnection((err,conn)=>{
        conn.query(loginSql, (err,result)=>{
            if(!err) {
                if(result.length != 0){
                    req.session.user = {...loginData}
                    const {user} = req.session
                    console.log(req.session)
                    console.log(user.id)
                    res.render('main.html',{
                        user,
                    })
                }
                else{
                    res.send(alertmove('/user/login','비번확인바람'))
                }
            }
            else {
                console.log('aa')
            }
        })
        conn.release();
    })
}

// 가입 get

exports.join = (req,res)=> {
    res.render('user/join')
}

// 가입 post

exports.joinAction = (req, res) => {
    let joinId = req.body.id
    let joinPw = req.body.pw
    let joinName = req.body.name
    let joinNickname = req.body.nickname
    let birthday = req.body.birth_year + req.body.birth_month + req.body.birth_day;
    let joinGender = req.body.gender
    let joinPhone = req.body.phone
    let joinMobile = req.body.mobile
    

    console.log(joinId,joinPw,joinName,birthday)

    let checkId = `select * from userAccount where id='${joinId}' or phone='${joinPhone}' or mobile='${joinMobile}'`
    let addData = `insert into userAccount(id, pw, name, nickname, birth, gender, phone, mobile, userlevel) values('${joinId}','${joinPw}', '${joinName}', '${joinNickname}','${birthday}', '${joinGender}', '${joinPhone}', '${joinMobile}',3)`

    pool.getConnection( (error,conn)=> {
        if ( error ) throw error
        conn.query(checkId,(err,result)=>{
            
            if(result.length == 0) {
                console.log('회원가입 성공')
                conn.query(addData,(err,result)=>{
                    if(err) throw err
                    console.log(`insert 문 진입`)
                    res.send(alertmove(`/user/welcome?id=${joinId}&name=${joinName}&gender=${joinGender}&phone=${joinPhone}&mobile=${joinMobile}`, '회원가입이 완료되었습니다.'))
                })
            }
            else {
                console.log('회원가입 실패')
                res.send(alertmove('/user/login','중복된 아이디/닉네임/전화번호 입니다.'))
            }
        })
        conn.release()
    })
}

// 웰컴 페이지: 아이디, 이름, 성별, 잔반, 폰번

//

exports.profile = 
(req,res) => {
    let proId = req.session.user.id 
    let profileCheck = `select * from userAccount where id ='${proId}'`
    
    pool.getConnection( (err, conn) => {
        if(!err) {
            conn.query(profileCheck, (err, result) => {
                let temp = { id: result[0].id, name: result[0].name, gender:result[0].gender, 
                phone:result[0].phone, mobile:result[0].mobile, nickname:result[0].nickname }                
                
                res.render('user/profile', {
                    user:temp
                })    
            })    
        }
        else { throw err }
    })    
}

//

exports.welcome = (req, res) => {
    let welcomeId = req.query.id
    let welcomeName = req.query.name
    let welcomeGender = req.query.gender
    let welcomePhone = req.query.phone
    let welcomeMobile = req.query.mobile

    res.render('user/welcome.html', {
        id:welcomeId,
        name:welcomeName,
        gender:welcomeGender,
        phone: welcomePhone,
        mobile: welcomeMobile
    })
}

//

exports.logout = (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/','로그아웃 되었습니다.'))
}

