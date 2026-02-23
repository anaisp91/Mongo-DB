// CONTROLADOR --- contiene la lógica (funciones) que se ejecutan en las rutas
//--- necesita el modelo
//Recibe la petición (req) >>> Usar el modelo (importamos) >>> responde (res)

import { User, userSchema } from "../models/UserModel.js";

//Traer todos los usuarios - Read - GET - /
export const getAllUsers = async (req, res) => {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
}

//Traer un usuario por id - Read - GET - /:id
export const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({ error: 'Usuario no encontardo'})
        }

        return res.status(200).json(user) //200: OK

    } catch (err) {
        
        //return res.status(400).json({error: 'ID no valido'})
        next(err)
    }
   
}

//Crear un usuario - Create - POST - / 
export const createUser = async (req, res, next)=> {
    try {
        const newUser = new User(req.body)
        const saveUser = await newUser.save()
        res.status(201).json(saveUser) //201:Created

    } catch (err) {
       //res.status(400).json({error: err.message}) //400: Bad request
       next(err)
    }
}

//Actualizar un usuario - Update - PUT - /:id
export const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const updateUser = await User.findByIdAndUpdate(
            id, 
            req.body, 
            {new: true, runValidator: true})

        if(!updateUser){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }

        return res.status(200).json(updateUser)
        
    } catch (err) {
        //return res.status(400).json({error : 'ID no valido'})
        next(err)
    }

}

//Eliminar usuario - Delete - DELETE - /:id

export const deleteUser = async (req,res, next) => {
    try {
        const {id} = req.params
        const deleteUser = await User.findByIdAndDelete(id)

        if(!deleteUser){
            return res.status(404).json({error: "Usuario no enconrado"})
        }

        return res.status(204).json('Usuario eliminado correctamente') //204: No content 

    } catch (err) {
        //return res.status(400).json({error: "ID no valido"})
        
        //Middleware de gestion de errores
        next(err)
    }
    
}