const express=require("express")
const {SocialModel}=require("../models/social.model")
const socialRouter= express.Router()
const{auth}=require("../middleware/auth.middleware")
socialRouter.use(auth)
socialRouter.post("/create",async(req,res)=>{
   try{
    const post= new SocialModel(req.body)
    await post.save()
    res.status(200).json({msg:"post added",post:req.body})
   }catch(err){
    res.json({msg:err.message})
   }
})

socialRouter.get("/",async(req,res)=>{
    const {device}=req.query
    const query={userID:req.body.userID}
    if(device){
       query.device=device
    }
    try{
      const post= await SocialModel.find(query)
      res.json({msg:"post fetched",post:post})
    }catch(err){
        res.json({msg:err.message})
    }
})

socialRouter.patch("/update/:id",async(req,res)=>{
    const userIdinuserdoc=req.body.userID
   const socialId=req.params.id
   try{
     const post= await SocialModel.findOne({_id:socialId})
     const userIdpost=post.userID
     if(userIdinuserdoc===userIdpost){
        console.log(userIdinuserdoc,"use",userIdpost)
         await SocialModel.findByIdAndUpdate({_id:socialId},req.body)
         res.status(200).json({msg:`${post.title} is updated`,post:req.body})
     }
   }catch(err){
    res.json({msg:err.message})
   }
})

socialRouter.delete("/delete/:id",async(req,res)=>{
    const userIdinuserdoc=req.body.userID
    const socialId=req.params.id
    try{
      const post= await SocialModel.findOne({_id:socialId})
      const userIdpost=post.userID
      if(userIdinuserdoc===userIdpost){
         
          await SocialModel.findByIdAndUpdate({_id:socialId},req.body)
          res.status(200).json({msg:`${post.title} is deleted`,post:req.body})
      }
    }catch(err){
     res.json({msg:err.message})
    }
})


module.exports={
    socialRouter
}