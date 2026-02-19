// CONTROLADOR --- contiene la lógica (funciones) que se ejecutan en las rutas
//--- necesita el modelo
//Recibe la petición (req) >>> Usar el modelo (importamos) >>> responde (res)

import { User, userSchema } from "../models/UserModel.js";

//Traer todos los usuarios - Read - GET - /
export const getAllUsers = async (req, res) => {
    const todosUsuarios = await User.find()
    res.status(200).json(todosUsuarios)
}

//Traer un usuario por id - Read - GET - /:id

//Crear un usuario - Create - POST - / 

//Actualizar un usuario - Update - PUT - /:id

//Eliminar usuario - Delete - DELETE - /:id