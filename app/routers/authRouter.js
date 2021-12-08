import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'

const authRouter = new Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.post('/signup', AuthController.signup)

export default authRouter
