import express from 'express'
export const router = express.Router()

import { register, login, getProfile } from '../controllers/authController.js'
import { auth } from '../middlewares/authMiddleware.js'

//rutas publicas
router.post('/register', register)
router.post('/login', login)

//rutas protegidas - pasan por el middleware de autenticacion
router.get('/profile', auth, getProfile)