const mongoose =require("mongoose");
require('dotenv').config()

async function main(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@techstore.jnxr1sz.mongodb.net/?retryWrites=true&w=majority`)

    console.log('Conectado ao BD')
}

main().catch((error) => console.log("Conexão falhou ", error))

module.exports = main