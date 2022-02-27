const pool = require("../../db")
const { alertmove } = require("../util/alertmove")
const queries = require('../.././queries/index.js')


// 로그인 get 
exports.login = (req, res) => {
    try {
        res.render('user/login.html')
    } catch (error) {
        console.log(`로그인 페이지 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

// 로그인 post
exports.loginAction = (req, res) => {
    try {
        const { id, pw } = req.body
        let param = [ id, pw ]

        pool.getConnection((err, conn) => {
            conn.query(queries.loginSql, param, (err, result) => {
                if (!err) {
                    if (result.length != 0) {
                        if( result[0].active === 0){
                            res.send(alertmove('/', '이용중지 회원입니다, 관리자에게 문의하세요'))
                        }else{
                            req.session.user = { ...result[0] }
                            console.log(req.session.user )
                            res.send(alertmove('/', '로그인에 성공하였습니다.'))
                        }
                    }else {
                        res.send(alertmove('/user/login', '로그인 정보를 확인해주세요.'))
                    }
                }
                else { throw err }
            })
            conn.release();
        })
    } catch (error) {
        console.log(`로그인 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 로그인이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

// 가입 get

exports.join = (req, res) => {
    try {
        res.render('user/join')
    } catch (error) {
        console.log(`가입 페이지 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

// 가입 post

exports.joinAction = (req, res) => {
    try {
        let { id, pw, name, nickname, gender, phone, mobile } = req.body
        let birthday = req.body.birth_year + req.body.birth_month + req.body.birth_day;

        let param1 = [id, nickname, phone, mobile]
        let param2 = [id, pw, name, nickname, birthday, gender, phone, mobile]

        pool.getConnection((error, conn) => {
            if (error) { throw error }
            conn.query(queries.checkId, param1, (err, result) => {
                if (result.length == 0) {
                    conn.query(queries.addData, param2, (err, result) => {
                        if (err) { throw err }
                        res.send(alertmove(`/user/welcome?id=${id}&name=${name}&gender=${gender}&phone=${phone}&mobile=${mobile}`, '회원가입이 완료되었습니다.'))
                    })
                }
                else {
                    res.send(alertmove('/user/join', '입력한 정보를 확인해주세요.'))
                }
            })
            conn.release()
        })
    } catch (error) {
        console.log(`가입 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 회원가입이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

//

exports.profile =
    (req, res) => {
        try {
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
        } catch (error) {
            console.log(`프로필 페이지 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }

//

exports.welcome = (req, res) => {
    try {
        let { id, name, gender, phone, mobile } = req.query
        res.render('user/welcome.html', {
            id,
            name,
            gender,
            phone,
            mobile
        })
    } catch (error) {
        console.log(`웰컴 페이지 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

//

exports.logout = (req, res) => {
    try {
        req.session.destroy(() => {
            req.session
        })
        res.send(alertmove('/', '로그아웃 되었습니다.'))
    } catch (error) {
        console.log(`로그아웃 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 로그아웃이 불가능합니다. 관리자에게 문의해주세요.`))
    }
}

exports.resign = (req, res) => {
    try {
        pool.getConnection((err, conn) => {
            let param = [req.session.user.id]
            conn.query(queries.userResign, param, (error, result) => {
                req.session.destroy(() => {
                    req.session
                    res.send(alertmove('/', '회원 탈퇴가 완료 되었습니다.'))
                })
            })
        })
    } catch (error) {
        console.log(`회원탈퇴 에러 발생:  `, error)
        res.send(alertmove("/", `알 수 없는 이유로 회원탈퇴가 불가능합니다. 관리자에게 문의해주세요.`))
    }
}