require('dotenv').config()
const mysql = require('mysql')
const mysql2 = require(`mysql2`)

let host = process.env.DB_HOST
let user = process.env.DB_USER
let password = process.env.DB_PASSWORD
let database = process.env.DB_DATABASE

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit:5
})

module.exports = pool


