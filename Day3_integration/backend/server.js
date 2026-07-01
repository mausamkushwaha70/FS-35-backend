const express = require("express")
const connectDB = require("./src/config/db")
const employeeRoutes = require("./src/routes/employee.route")
const cors = require("cors")
let app = express();
connectDB();
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// app.get("/",(req, res)=>{
//     res.send("this is integration server")
// })

app.use("/api/employees",employeeRoutes)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})