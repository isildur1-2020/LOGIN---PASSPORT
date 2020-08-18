// variables de entorno
const config        = require('./config/config')
// librerias
const path          = require('path')
const morgan        = require('morgan')
// express
const express       = require('express')
const passport      = require('passport')
const session       = require('express-session')
// rutas middleware
const routes        = require('./routes/routes')
const handlerErrors = require('./handlerErrors/handlerErrors')

// app
const app = express()
require('./passport/local-auth')

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.use(routes)
app.use(handlerErrors)

// error 404
app.use((req, res, next) => {
    res.render('404')
})

// server
app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}`)
})