const asyncWrapper = require("../../utils/asyncWrapper");

const logout = asyncWrapper(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
    sameSite: "none",
  });

  return res.status(201).json({
    message: "Logged out successfully",
    status_code: 201,
    data: null,
  });
});

module.exports = logout;
