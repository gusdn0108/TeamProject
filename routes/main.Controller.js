
const express = require('express')
const router = express.Router()

exports.main =
    (req,res)=>{
        res.render(`main`)
    }