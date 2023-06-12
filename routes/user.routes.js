const express=require("express")
const {UserModel}=require("../models/user.model")
const userRoutes=express.Router()
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config()
userRoutes.post("/signup",async(req,res)=>{
   const {name,email,pass}=req.body
   try{
      bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.json({msg:err.message})
        }else{
            const user = new UserModel({name,email,pass:hash})
            await user.save()
            res.json({msg:"user registered",user:req.body})
        }
      })
   }catch(err){
    res.json({msg:err.message})
   }
})

userRoutes.post("/login",async(req,res)=>{
     const {email,pass}=req.body
     try{
        const user = await UserModel.findOne({email})
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                let token= jwt.sign({userID:user._id,user:user.name},process.env.secret)
                res.json({msg:"login sucessfull",token})
            }else{
                res.json({msg:err.message})
            }
        })
     }catch(err){
        res.json({msg:err.message})
     }

})

module.exports={
    userRoutes
}