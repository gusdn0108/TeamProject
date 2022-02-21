const res = require("express/lib/response")
const { connect } = require(".")
const pool = require("../../db")
const { alertmove } = require("./alertmove")

let loginUser = function(id, pw) {
    
    let loginSql = `select * from members where id = '${id}' and pw = '${pw}' ;`
    pool.getConnection((err, conn) => {
        conn.query(loginSql,
        (err, result) => {
            if(!err) {
                if(result.length != 0) {
                    console.log(result[0].name)
                    res.send(alertmove('/', '로그인 되었습니다.'))
                }
                else {
                    res.send(alertmove('user/login', 'id/pw를 확인해주세요.'))
                }
            }
            else {throw err}
        })
        conn.release();
    })
}

module.exports = loginUser

