const express = require("express")
const router = express.Router();
const upload = require("../config/multer")


router.post("/",upload.single("image"),(req,res)=>{
    console.log(req.file);

    return res.status(200).json({
        success:true,
        message: "Image found ,successfully"
    });
});

module.exports = router;