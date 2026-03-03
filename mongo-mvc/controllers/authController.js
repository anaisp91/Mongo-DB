import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel.js'
import { createToken } from '../utils/createToken.js'


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

//Login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Validacion de los campos de entrada del login
        if(!email | !password){
            return res.status(400).json({error: 'Email y password son obligatorios'})
        }

        //Buscar usuario por email
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({error: 'Credenciales invalidas'})
        }

        //comparar contraseñas del usuario con las del req.body
        const passwordOK = await bcrypt.compare(password, user.password)

        if(!passwordOK){
            return res.status(400).json({error: 'Credenciales invalidas'})
        }

        //Crear token
        const token = createToken(user._id)

        //Responder sin exponer la contraseña
        return res.status(200).json({
            user:{
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                edad: user.edad
            }, token
        })
        
    } catch (err) {
        return res.status(500).json({error: 'Error de servidor'})
    }
}


//get profile
export const getProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }

        return res.status(200).json(user)

    } catch (err) {
        return res.status(500).json({error: 'Error de servidor'})
    }
}