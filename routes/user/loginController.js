const res = require("express/lib/response")
const router = require(".")
const { connect } = require(".")
const pool = require("../../db")
const { alertmove } = require("../util/alertmove")

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
            if(!err){
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
        })
        conn.release();
    })
}
