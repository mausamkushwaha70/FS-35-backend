const jwt = require("jsonwebtoken");


const userVerifyMiddleware = (req, res, next) => {

  const token = req.cookies.secret;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
    }
};

module.exports = userVerifyMiddleware;
