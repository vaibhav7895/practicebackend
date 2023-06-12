const express= require("express")
const app= express()
const {connection}= require("./db")
const{userRoutes}= require("./routes/user.routes")
const{socialRouter}=require("./routes/social.routes")
const cors=require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())




app.use("/users",userRoutes)
app.use("/social",socialRouter)
app.listen(process.env.PORT,async()=>{
    try{
      await connection
      console.log("connected to db")
      console.log(`connected to port ${process.env.PORT}`)
    }catch(err){
      console.log(err)
      console.log("connection failed")
    }
})