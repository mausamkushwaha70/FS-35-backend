const express = require("express");
const { registerController, loginController} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerController);
router.get("/login", loginController);

module.exports = router;
