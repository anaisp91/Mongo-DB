import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel.js'

//creartoken
const createToken = (userId) => {
    return jwt.sign(
        { id: userId },//id de usuario
        process.env.JWT_SECRET,//secreto de jwt - env
        { expiresIn: process.env.JWT_EXPIRES_IN }//tiempo de expiracion/validez
    )
}

//registro
export const register = async (req, res) => {
    try {
        const { nombre, email, edad, password } = req.body

        if(!nombre | !email | !password) {
            return res.status(400).json({error: 'Nombre, email y contraseña son obligatorios'})
        }

        const newUser = await User.findOne({email})

        if(newUser){
            return res.status(409).json({error: 'El email ya esta registrado'})
        }

        const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTS_ROUNDS))

        const createUser = await User.create({nombre, email, edad, password: hashed})

        const token = createToken(createUser._id) //le tenemos que pasar el id como hemos especificado en la funcion, lo sacaremos del usuario creado

        //si se ha gusradado bien el token va a devolver

        return res.status(201).json({
            user: {
                id: createUser._id,
                nombre: createUser.nombre,
                email: createUser.email,
                edad: createUser.edad
            }, token
        })


    } catch (err) {
        return res.status(500).json({error: 'Error de servidor'})
    }
}