const res = require("express/lib/response")
const { connect } = require(".")
const pool = require("../../db")
const { alertmove } = require("../util/alertmove")

let loginUser = function(id, pw) {
    let isLogin = false;
    let loginSql = `select * from userAccount where id = '${id}' and pw = '${pw}' ;`
    pool.getConnection((err, conn) => {
        conn.query(loginSql,(err, result) => {
            if(!err) {
                if(result[0].id != undefined) { 
                    console.log('비번오케이')
                    return isLogin = true;
                }
            }
            else {throw err}
        })
        conn.release();
    })
    return true;
}

module.exports = loginUser

