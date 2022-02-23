const { alertmove } = require('./alertmove.js')

const Auth = (req, res, next) => {
    let {user} = req.session
    if(user != undefined) {
        next()
    }
    else {
        res.send(alertmove('/user/login', '로그인 해주세요!'))
    }
}

module.exports = Auth;