const asyncWrapper = require("../../utils/asyncWrapper");
const jwt = require("jsonwebtoken");

const session = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status_code: 401,
      message: "Un Authorized",
      data: null,
    });
  }

  const user = jwt.verify(token, process.env.SECRET_KEY);

  if (!user) {
    return res.status(401).json({
      status_code: 401,
      message: "Invalid Token",
      data: null,
    });
  }

  return res.status(200).json({
    status_code: 200,
    message: "admin access success",
    data: user,
  });
});

module.exports = session;
