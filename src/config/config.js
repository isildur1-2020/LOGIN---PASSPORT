require('dotenv').config()

config = {
    port: process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dbname: process.env.DB_NAME,
    secret: process.env.SECRET
}
module.exports = config