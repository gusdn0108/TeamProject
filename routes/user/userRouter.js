

exports.login =
(req, res) => {
    res.render('user/login.html')
}

exports.join =
(req, res) => {
    res.render('user/join')
}

exports.welcome =
(req, res) => {
    res.render('user/welcome.html')
}