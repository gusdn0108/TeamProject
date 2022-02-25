const express = require('express')
const nunjucks = require('nunjucks')
const router = require(`./routes`)
const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'html')
nunjucks.configure('views', { express: app, })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true, }))



const session = require('express-session')
const Memorystore = require('memorystore')(session)

let sessionObj = {
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({ checkperiod: 300 * 60 * 1000 }),
    cookie: {
        maxAge: 300 * 60 * 1000
    },
}


app.use(session(sessionObj))
app.use(router)

app.listen(port, () => {
    console.log(`server running on ${port}`)
})