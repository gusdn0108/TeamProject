
const express = require('express')
const router = express.Router()

exports.main =
    (req,res)=>{
        let {user} = req.session
        if(user != undefined){
        res.render(`main`,{
            user,
        })
    }else{
        res.render('main')
    }
    }