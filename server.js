const express = require('express')
const nunjucks = require('nunjucks')
const router = require(`./routes`)
const app = express()
const port = process.env.PORT || 3000

app.set('view engine','html')
nunjucks.configure('views',{express:app,})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true,}))

//yj 추가함 (세션)
const session = require('express-session')
const Memorystore = require('memorystore')(session)
//yj 추가함 (세션)
let sessionObj = {
    secret: 'admin',
    resave: false,
    saveUninitialized:true,
    store:new Memorystore({checkperiod: 30*60*1000}),
    cookie: {
        maxAge: 30*60*1000
    }
}

app.use(session(sessionObj))
app.use(router)



// 관리자 라우터 분리하기
app.get('/admin', (req,res)=>{
    res.render('admin/admin_list')
})

app.get('/admin/update', (req,res)=>{
    res.render('admin/admin_update')
})



app.listen(port,()=>{
    console.log(`server running on ${port}`)
})