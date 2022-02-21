const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const PORT = process.env.PORT || 3000
const router = express.Router()

app.set('view engine','html')
nunjucks.configure('views',{express:app,})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true,}))

const userRouter = require('./routers/user/index.js')

//

app.get('/',(req,res)=>{
    res.render('main')
})

// 사용자 라우터 분리하기

app.use('/user',(req,res)=>{
    res.render('user/login')
})


// 게시판 라우터 분리하기

app.use('/board/list',(req,res)=>{
    res.render('board/board_list')
})

app.get('/board/write',(req,res)=>{
    res.render('board/board_write')
})

app.get('/board/view',(req,res)=>{
    res.render('board/board_view')
})

app.get('/board/update',(req,res)=>{
    res.render('board/board_update')
})

// 관리자 라우터 분리하기
app.get('/admin', (req,res)=>{
    res.render('admin/admin_list')
})

app.get('/admin/update', (req,res)=>{
    res.render('admin/admin_update')
})



app.listen(PORT,()=>{
    console.log('server start')
})