import dotenv from "dotenv";
dotenv.config()
import app from "./src/app.js";
import { dbConnect } from "./src/config/db.js";
dbConnect();

const PORT = process.env.port || 5000
app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`)
})