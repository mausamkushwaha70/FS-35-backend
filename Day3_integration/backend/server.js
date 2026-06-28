const express = require("express")
const connectDB = require("./src/config/db")
const employeeRoutes = require("./src/routes/employee.route")

let app = express();
connectDB();
app.use(express.json())

// app.get("/",(req, res)=>{
//     res.send("this is integration server")
// })

app.use("/",employeeRoutes)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})