const mongoose = require("mongoose")
 const DBconnection = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/employee-35")
        console.log("DB connected");
    } catch (error) {
        console.log("DB not connect ",error)
        
    }
}

module.exports = DBconnection   