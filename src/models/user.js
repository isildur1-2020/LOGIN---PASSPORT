const bcrypt = require('bcryptjs')
// MongoAtlas
const MongoAtlas = require('../database/mongoAtlas')
const mongoDB = new MongoAtlas()

function User(email = 'example@gmail.com', password='example') {
    this.email = email
    this.password = password
} 
User.prototype.cryptPassword = async function(password) {
    const genSalt = await bcrypt.genSalt(20)
    return await bcrypt.hash(password, genSalt)
}
User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
} 
User.prototype.save = async function() {
    return await mongoDB.create({email: this.email, password: this.password})
}
User.prototype.findUserById = async (id) => {
    const user = await mongoDB.findUser(id)
    return user
}
User.prototype.findUserByEmail = async (value) => {
    return await mongoDB.findByEmail(value)
}
User.prototype.putThis = function(email, password) {
    this.email = email
    this.password = password
}

module.exports = User

