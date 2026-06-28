const mongoose = require("mongoose");

let connectDB =async ()=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/productItem");
       console.log("MongoDB connected")

    } catch (error) {
        console.log("error in mongodb connection ", error)
    }
}

module.exports = connectDB