const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRETKEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
