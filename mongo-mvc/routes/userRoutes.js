//ROUTES --- define la URL (endpoints) y el metodo HTTP (GET, POST, PATCH, PUT, DELETE)
// y ejecuta un controlador en cada ruta
//CRUD ---Create, Read, Update , Delete


import express from 'express'
export const router = express.Router() 



//importamos funciones
import { getAllUsers, 
         getUserById,
         createUser } from "../controllers/userController.js";

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)