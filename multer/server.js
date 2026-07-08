require("dotenv").config();
const express = require("express");
const postRouter = require("./src/routes/post.routes");
const app = express();


app.use(express.json());
let PORT = process.env.port || 5000;

app.use("/",postRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


