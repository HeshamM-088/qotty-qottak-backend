const authorization =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status_code: 403,
        message: "Access Denied",
        data: null,
      });
    }
    next();
  };

module.exports = authorization;
