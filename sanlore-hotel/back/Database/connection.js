const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION)
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}