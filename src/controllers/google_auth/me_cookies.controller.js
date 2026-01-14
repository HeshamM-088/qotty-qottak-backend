const asyncWrapper = require("../../utils/asyncWrapper");
const jwt = require("jsonwebtoken");
const User = require("../../modules/user.module");

const me_cookies = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      status_code: 401,
      data: null,
      message: "Not authenticated",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id).select("-googleId");

  if (!user) {
    return res.status(401).json({
      status_code: 401,
      message: "User not found",
      data: null,
    });
  }

  return res.status(200).json({
    status_code: 200,
    data: user,
    message: "Login Success",
  });
});

module.exports = me_cookies;
