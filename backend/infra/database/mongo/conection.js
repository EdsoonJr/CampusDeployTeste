const mongoose = require("mongoose")

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@campseguro.jdyxo6n.mongodb.net/teste?retryWrites=true&w=majority&appName=CampSeguro`)

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o MongoDb")
    })

    connection.on("open", () =>{
        console.log("Conectado ao MongoDb!")
    })
}

connect();

module.exports = mongoose;