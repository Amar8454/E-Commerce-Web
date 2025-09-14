const jwt = require("jsonwebtoken");

exports.UserAuthen = (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    
    if (!token) {
      return res.status(400).json({
        message: " Please Login",
        success: false,
        error: true,
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};
