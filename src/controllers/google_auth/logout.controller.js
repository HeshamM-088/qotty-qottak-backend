const asyncWrapper = require("../../utils/asyncWrapper");

const logout = asyncWrapper(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".vercel.app" : "localhost",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(201).json({
    message: "Logged out successfully",
    status_code: 201,
    data: null,
  });
});

module.exports = logout;
