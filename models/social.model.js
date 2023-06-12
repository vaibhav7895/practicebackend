const mongoose=require("mongoose")

const SocialSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
},{
    versionKey:false
})

const SocialModel=mongoose.model("social_post",SocialSchema)

module.exports={
    SocialModel
}