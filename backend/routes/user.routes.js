import express from 'express'
import { getCrrentUser } from '../controllers/user.controller.js'
import { isAuth } from '../middlewares/isAuth.js'



const userRouter = express.Router()



userRouter.get("/current",isAuth, getCrrentUser)



export default userRouter