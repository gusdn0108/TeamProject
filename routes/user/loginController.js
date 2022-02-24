const pool = require("../../db")
const { alertmove } = require("../util/alertmove")
const queries = require('../.././queries/index.js')


// 로그인 get 
exports.login = (req,res) => {
    res.render('user/login.html')
} 

// 로그인 post
exports.loginAction = (req,res) => {
    const {id,pw} = req.body
    const loginData = {id,pw}

    let param = [`${id}`,`${pw}`]
    
    pool.getConnection((err,conn)=>{
        conn.query(queries.loginSql, param, (err,result)=>{
            if(!err) {
                if(result.length != 0){
                    req.session.user = {...result[0]}
                    const {user} = req.session
                    res.render('main.html',{
                        user,
                    })
                }
                else{
                    res.send(alertmove('/user/login','비번확인바람'))
                }
            }
            else {throw err}
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

    let param1 = [`${joinId}`,`${joinNickname}`, `${joinPhone}`, `${joinMobile}`]
    let param2 = [`${joinId}`,`${joinPw}`, `${joinName}`,`${joinNickname}`,`${birthday}`, `${joinGender}`,`${joinPhone}`,`${joinMobile}`]

    pool.getConnection( (error,conn)=> {
        if ( error ) throw error
        conn.query(queries.checkId,param1, (err,result)=>{
            
            if(result.length == 0) {
                console.log('회원가입 성공')
                conn.query(queries.addData, param2, (err,result)=>{
                    if(err) throw err
                    console.log(`insert 문 진입`)
                    res.send(alertmove(`/user/welcome?id=${joinId}&name=${joinName}&gender=${joinGender}&phone=${joinPhone}&mobile=${joinMobile}`, '회원가입이 완료되었습니다.'))
                })
            }
            else {
                console.log('회원가입 실패')
                res.send(alertmove('/user/join','입력한 정보를 확인해주세요.'))
            }
        })
        conn.release()
    })
}

//

exports.profile = 
(req,res) => {
    let proId = req.session.user.id 
    let param = [`${proId}`]
    pool.getConnection( (err, conn) => {
        if(!err) {
            conn.query(queries.profileCheck, param, (err, result) => {
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

