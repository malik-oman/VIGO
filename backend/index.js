import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { connectDb } from './config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'





// ================================================================================
const app = express()
// ====================================MIDDLEWARES===============================
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))


// ============================API END POINTS==========================================
app.use("/api/auth",authRouter)

// ==============================================================================
const port = process.env.PORT

// ================================================================================

app.listen(port,()=>{
    connectDb()
    console.log("Server runing ")
})