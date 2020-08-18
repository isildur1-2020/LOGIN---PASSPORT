const express = require('express')
const router = express.Router()

const passport = require('passport')

const isAuthenticate = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

// HOME
router.get('/', (req, res, next) => {
    res.render('home')
})
router.get('/profile', isAuthenticate, (req, res, next) => {
    res.render('profile')
})
// Iniciar Sesión
router.get('/login', (req, res, next) => {
    res.render('login')
})
router.post('/login', passport.authenticate('login-auth', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: true
}))
// Regístrate
router.get('/register', (req, res, next) => {
    res.render('register')
})
router.post('/register', passport.authenticate('auth-register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: true
}))
// Logout
router.get('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router