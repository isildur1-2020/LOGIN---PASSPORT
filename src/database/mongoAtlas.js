const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config/config");
const URI = `mongodb+srv://tapitarias:${config.password}@cluster0.ra5ze.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;

class MongoAtlas {
  constructor() {
    this.client = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.mongoDB;
    this.connect();
  }
  async connect() {
    try {
      const database = await this.client.connect();
      this.mongoDB = database.db(config.dbname).collection("users");
      console.log("Conectado con éxito a MongoAtlas !!!");
    } catch (err) {
      console.log("No hemos podido conectarnos a MongoAtlas:", err.message);
    }
  }
  async create(data) {
    try {
      const userCreated = await this.mongoDB.insertOne(data);
      return userCreated.ops[0] || {}
    } catch (err) {
      console.log("Usuario no ha sido creado:", err.message);
    }
  }
  async findUser(id) {
    try {
      return await this.mongoDB.findOne({_id: ObjectId(id)});
    } catch (err) {
      console.log(
        "No hemos podido encontrar el usuario, lo sentimos:",
        err.message
      );
    }
  }
  async findByEmail(value) {
    try {
      return await this.mongoDB.findOne({email: value})
    } catch(err) {
      console.log('No hemos podido encontrar lo que buscabas:', err.message)
    }
  }
}
module.exports = MongoAtlas;

// const mongoose = require('mongoose')
// const config = require("../config/config");
// const URI = `mongodb+srv://tapitarias:${config.password}@cluster0.ra5ze.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;

// mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(db => console.log('Conectado éxitosamente a MongoAtlas'))
//   .catch(err => console.log('No hemos podido conectarnos MongoAtlas:', err.message))
