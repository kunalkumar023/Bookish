import express from "express"
import dotenv from "dotenv"
import conn from "./conn/conn.js"
import user from './routes/user.js'
import book from './routes/book.js'
import fav from './routes/favourite.js'
import order from './routes/order.js'
import cart from './routes/Cart.js'
import cookieParser from "cookie-parser"
import cors from 'cors'

const app=express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/v1",user)
app.use("/api/v1",book)
app.use("/api/v1",fav)
app.use("/api/v1",order)
app.use("/api/v1",cart)


conn()
app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is started ${process.env.PORT}`)
})