const { alertmove } = require('./alertmove.js')
const SQL = require(`../../queries`)
let pool = require(`../../db`)



exports.checkUser = (req, res, next) => {
    let {user} = req.session
    if(user != undefined) {
        next()
    }
    else {
        res.send(alertmove('/user/login', '로그인 후 이용 가능한 서비스입니다.'))
    }
}

exports.checkLevel = (req, res, next) => {
    let idx = [req.query.idx || req.body.idx]
    let {nickname} = req.session.user
    let {userlevel} = req.session.user
    pool.getConnection((err,conn)=>{
        conn.query(SQL.boardView,idx,(error,result)=>{
            if(!error){
                if(userlevel !== 3 || nickname == result[0].nickname ){
                    next()
                } else {
                    res.send(alertmove('/board/list', '권한이 없습니다.'))
                }
            } 
            conn.release()
        })
    })
}
