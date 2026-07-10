import express from 'express'
import { signIn, signUp, singOut } from '../controllers/auth.controllers.js'


const authRouter = express.Router()


authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", singOut)


export default authRouter