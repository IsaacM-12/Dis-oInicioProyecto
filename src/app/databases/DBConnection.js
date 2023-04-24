const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

// Conectar a la base de datos
mongoose
  .connect("mongodb://127.0.0.1:27017/diseno", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

module.exports = DBConnection;
