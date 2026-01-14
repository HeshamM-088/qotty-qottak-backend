const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const errorHandler = require("./middlewares/error.middleware");
require("dotenv").config();
const connectDB = require("./config/db");
const auth_router = require("./routes/auth/auth.route");
require("./config/passport");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://qotty-qottak.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome To Qotty Qotetak API",
    status_code: 200,
  });
});

app.use("/api/v1/auth", auth_router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});

module.exports = app;
