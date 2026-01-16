const jwt = require("jsonwebtoken");

const authintication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status_code: 401,
        message: "Unauthorized: No token provided",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
      return res.status(401).json({
        status_code: 401,
        message: "Unauthorized: Invalid token",
        data: null,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      status_code: 401,
      message: "Unauthorized: " + err.message,
      data: null,
    });
  }
};

module.exports = authintication;
