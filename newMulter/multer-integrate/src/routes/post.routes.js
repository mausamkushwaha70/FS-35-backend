const express = require("express");
const upload = require("../config/multer");
const { postController } = require("../controller/post.controller");
const router = express.Router();

router.post("/", upload.single("image"), postController);

module.exports = router;