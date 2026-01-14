const jwt = require("jsonwebtoken");

const authintication = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status_code: 401,
      data: null,
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authintication;
