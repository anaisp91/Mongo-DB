// cargar las variables de entorno
import dotenv from 'dotenv'
dotenv.config()

//importar dependencias
import express, { json } from 'express'
import { connect } from 'mongoose'

//importamos modulos
import {User, userSchema} from "./models/UserModel.js"

//crear app de express
const app = express()

//middleware para leer JSON cuando hagamos una peticion a la base de datos
app.use(json())

//conexion a MongoDB con Mongoose
connect(process.env.MONGO_URI)
.then(()=> console.log('Estas conectado a la BBDD'))
.catch(err => console.err('Error al conectarse a la BBDD',err))

/*
//ruta basica de prueba a la Home
app.get('/', (req, res) => {
    res.send('Hola esto es al home')
})
*/

//ruta para traer todos los usuarios
app.get('/', async (req, res) => {
    const todosUsuarios = await User.find()
    res.status(200).json(todosUsuarios)
})

//ruta para crear un usuario (CRUD--->create)
app.post('/createuser', async (req, res)=>{
    try {
        //crear instancia del modelo con los datos del body
        const nuevoUsuario = new User(req.body)

        //guardar en la base de datos el nuevo usuario
        const usuarioGuardado = await nuevoUsuario.save()

        //responder con el usuario guardado
        res.status(201).json(usuarioGuardado)
    } catch (err) {
        //manejio de errores d ela peticion
        res.status(400).json({error: err.message})
    }
})


//arrancar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
