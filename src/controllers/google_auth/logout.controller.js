const asyncWrapper = require("../../utils/asyncWrapper");

const logout = asyncWrapper(async (req, res, next) => {
  // const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(201).json({
    message: "Logged out successfully",
    status_code: 201,
    data: null,
  });
});

module.exports = logout;
