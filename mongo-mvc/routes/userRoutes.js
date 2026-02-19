//ROUTES --- define la URL (endpoints) y el metodo HTTP (GET, POST, PATCH, PUT, DELETE)
// y ejecuta un controlador en cada ruta
//CRUD ---Create, Read, Update , Delete


import express from 'express'
export const router = express.Router()



//importamos funciones
import { getAllUsers } from "../controllers/userController.js";

router.get('/', getAllUsers)