import mongoose from "mongoose"

export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connect")
    } catch (error) {
        console.log("error in momgoDb",error)
    }
}