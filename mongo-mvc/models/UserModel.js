//MODELO --- Representa los datos (schemas en Mongoose)

import mongoose from "mongoose" 


//definir el esquema(forma del documento)
const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true}, //obligadorio
    email: {type: String, required: true, unique: true}, //obligatorio y unico
    edad: {type: Number}
}, { timestamps: true}); //fecha y hora de creacion y actualizacion

//module.exports = mongoose.model("User", userSchema)

//creamos modelo
const User = mongoose.model("User", userSchema)

//exportamos ambos
export {User, userSchema}
