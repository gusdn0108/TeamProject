const express = require('express')
const nunjucks = require('nunjucks')
const router = require(`./routes`)

const app = express()
const port = process.env.PORT || 3000

app.set('view engine','html')
nunjucks.configure('views',{express:app,})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true,}))
app.use(router)


//

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