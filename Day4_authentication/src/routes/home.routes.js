const express = require("express");

const authMiddleware = require("../middleware/user.middleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "I m home route",
    data: req.user,
  });
});

module.exports = router;