// cargar las variables de entorno
import dotenv from 'dotenv'
dotenv.config()

//importar dependencias
import express, { json } from 'express'
import { connect } from 'mongoose'

//crear app de express
const app = express()

//middleware para leer JSON cuando hagamos una peticion a la base de datos
app.use(json())

//conexion a MongoDB con Mongoose
connect(process.env.MONGO_URI)
.then(()=> console.log('Estas conectado a la BBDD'))
.catch(err => console.err('Error al conectarse a la BBDD',err))

//ruta basica de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando en MongoDB')
})

//arrancar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
