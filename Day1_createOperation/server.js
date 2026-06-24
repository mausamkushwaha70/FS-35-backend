const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user.model");


let app = express();
app.use(express.json());
connectDB();

app.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All filed are Required",
        });
    }
    const newUser = await User.create({
        name,
        email,
        password
    });

    return res.status(201).json({
        success: true,
        message: "User created Successfully",
        data: newUser

    });
});

app.get("/home",(req,res)=>{
    res.send("")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
