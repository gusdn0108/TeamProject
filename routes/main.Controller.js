const express = require('express')
const router = express.Router()

exports.main =
    (req, res) => {
        try {
            const { user } = req.session
            if (user != undefined) {
                res.render(`main`, { user })
            } else { res.render('main') }
        } catch (error) {
            console.log(error)
        }

    }

exports.localUser = (req, res, next) => {
    res.locals.user = req.session.user
    next()
}
