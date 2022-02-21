const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')

app.set('view engine', 'html')
nunjucks.configure('views', {express:app})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//

let addUser = function(useridx, userlevel, id, pw, name, nickname, birth, gender, phone, mobile, ) {
    pool.getConnection((err,conn) => {
        conn.query(`insert into members(name,age,birth) values('${id}', ${age}, ${birthday})`,
            (err, result) => {
                if(!err) {console.log(result)}
                else { throw err }
            }
        )
        conn.release();
    })
    
    console.log('데이터 추가됨')
}


router.get('/login', (req, res) => {
    res.render('user/login')
})

//

router.get('/join',(req,res)=>{
    res.render('user/join')
})

//

router.get('/profile',(req,res)=>{
    res.render('user/profile')
})

module.exports = {
    router
}