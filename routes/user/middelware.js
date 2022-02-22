const res = require("express/lib/response")
const { VARCHAR } = require("mysql/lib/protocol/constants/types")

exports.login = 
    (req, res) => {
        res.render('user/login.html')
    }

exports.join = 
    (req, res) => {
        res.render('user/join')
    }

