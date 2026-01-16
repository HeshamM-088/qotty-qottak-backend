const asyncWrapper = require("../../utils/asyncWrapper");

const session = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status_code: 401,
      message: "admin access un authorized",
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
