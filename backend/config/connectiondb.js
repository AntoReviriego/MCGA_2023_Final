const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;
const db = async () => {
  try{
    const dbConnection = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to MongoDB: ${dbConnection.connection.host}`);
    console.log('Nombre de la base de datos:', mongoose.connection.db.databaseName);
  }
  catch (err){
    console.error(err);
  }
}
module.exports = db;