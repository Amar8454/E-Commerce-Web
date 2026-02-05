const jwt = require("jsonwebtoken");

exports.UserAuthen = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded?._id) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
        error: true,
      });
    }

    req.userId = decoded._id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: true,
      success: false,
    });
  }
};
