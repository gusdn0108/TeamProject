const pool = require("../../db")
const { alertmove } = require("../util/alertmove")
const queries = require('../.././queries/index.js')


// 로그인 get 
exports.login = (req, res) => {
    res.render('user/login.html')
}

// 로그인 post
exports.loginAction = (req, res) => {
    const { id, pw } = req.body
    let param = [id, pw]

    pool.getConnection((err, conn) => {
        conn.query(queries.loginSql, param, (err, result) => {
            if (!err) {
                if (result.length != 0) {
                    req.session.user = { ...result[0] }
                    res.send(alertmove('/', '로그인에 성공하였습니다.'))
                } else {
                    res.send(alertmove('/user/login', '로그인 정보를 확인해주세요.'))
                }
            }
            else { throw err }
        })
        conn.release();
    })
}

// 가입 get

exports.join = (req, res) => {
    res.render('user/join')
}

// 가입 post

exports.joinAction = (req, res) => {
    let { id, pw, name, nickname, gender, phone, mobile } = req.body
    let birthday = req.body.birth_year + req.body.birth_month + req.body.birth_day;

    let param1 = [id, nickname, phone, mobile]
    let param2 = [id, pw, name, nickname, birthday, gender, phone, mobile]

    pool.getConnection((error, conn) => {
        if (error) { throw error }
        conn.query(queries.checkId, param1, (err, result) => {
            if (result.length == 0) {
                conn.query(queries.addData, param2, (err, result) => {
                    if (err) {throw err}
                    res.send(alertmove(`/user/welcome?id=${id}&name=${name}&gender=${gender}&phone=${phone}&mobile=${mobile}`, '회원가입이 완료되었습니다.'))
                })
            }
            else {
                res.send(alertmove('/user/join', '입력한 정보를 확인해주세요.'))
            }
        })
        conn.release()
    })
}

//

exports.profile =
    (req, res) => {
        let param = [req.session.user.id]
        pool.getConnection((err, conn) => {
            if (!err) {
                conn.query(queries.profileCheck, param, (err, result) => {
                    let { id, name, gender, phone, mobile, nickname } = result[0]
                    let user = { id, name, gender, phone, mobile, nickname }
                    res.render(`user/profile`)
                })
            }
            else { throw err }
        })
    }

//

exports.welcome = (req, res) => {
    let { id, name, gender, phone, mobile } = req.query
    res.render('user/welcome.html', {
        id,
        name,
        gender,
        phone,
        mobile
    })
}

//

exports.logout = (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/','로그아웃 되었습니다.'))
}

