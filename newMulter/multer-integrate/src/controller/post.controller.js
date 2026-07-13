const sendFile = require("../config/imagekIt");

const postController = async (req, res) => {
    try {
    console.log(req.file);


        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"

            });
        }
        let file = req.file
        
        let uploadFile = await sendFile(file.buffer, file.originalname)

        console.log(file)
        return res.status(200).json({
            message: "File uploaded successfully",
            url:uploadFile
            
        }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Upload failed",
            error: error.message,
        });
    }
};

module.exports = { postController };
