// passport
const passport = require('passport')
const { Strategy } = require('passport-local')
// Schema
const User = require('../models/user')

passport.use('auth-register', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = new User(email, password)
    const findNewUser = await user.findUserByEmail(email)
    if(findNewUser) {
        return done(null, false)
    }
    const newUser = await user.save()
    done(null, newUser)
}))
passport.use('login-auth', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = new User(email, password)
    const isUser = await user.findUserByEmail(email)
    if(!isUser) {
        return done(null, false)
    }
    if(isUser.password === password){
        console.log('Password MongoAtlas: ',isUser.password, 'Password Ingresado', password)
        return done(null, isUser)
    }
    done(null, false)
}))

passport.serializeUser((user, done) => {
    done(null, user._id.toString())
})
passport.deserializeUser(async (id, done) => {
    const user = new User()
    const data = await user.findUserById(id)
    done(null, data)
})