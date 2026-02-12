import mongoose from "mongoose" 

const mongoose = mongoose

//definir el esquema(forma del documento)
const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true}, //obligadorio
    email: {type: String, required: true, unique: true}, //obligatorio y unico
    edad: {type: Number}
})

module.exports = mongoose.model("User", userSchema)