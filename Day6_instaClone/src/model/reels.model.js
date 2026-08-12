import mongoose from "mongoose";

const reelsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    media_url:{
        type:String,
        required:true
    },

   caption:{
    type:String,
   },

   likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
   }],

   comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"comment"
   }],

   viwers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})


const reelsModel = mongoose.model("reels", reelsSchema)
export default reelsModel