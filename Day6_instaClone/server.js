import dotenv from "dotenv";
dotenv.config()
import app from "./src/app.js";
import { dbConnect } from "./src/config/db.js";
import router from "./src/routes/auth.routes.js";
dbConnect();

const PORT = process.env.port || 5000

app.use("/",router)

app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`)
})