const asyncWrapper = require("../../utils/asyncWrapper");
const jwt = require("jsonwebtoken");
const User = require("../../modules/user.module");

const auth = asyncWrapper(async (req, res, next) => {
  const { googleId, email, name, avatar } = req.user;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar,
      googleId,
      provider: "google",
      role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  const isProd = process.env.NODE_ENV === "production";

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      domain: ".vercel.app",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .redirect(`${process.env.CLIENT_URL}/auth/google/success`);
});

module.exports = auth;
