const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth-35");
    console.log("Dbconnect");
  } catch (error) {
    message: ("database error", error);
  }
};

module.exports = dbConnect;
