
const jwt= require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token= req.headers.authorization.split(" ")[1]
    if(token){
        try{
           const decoded=jwt.verify(token,process.env.secret)
           if(decoded){
            req.body.userID=decoded.userID
            req.body.user=decoded.user
            next()
           }else{
            res.json({msg:"invalid token"})
           }
        }catch(err){
            res.json({msg:err.message})
        }
    }else{
        res.json({msg:"login again"})
    }
}


module.exports={
    auth
}