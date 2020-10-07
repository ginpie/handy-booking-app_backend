const { validateToken } = require("../utils/jwt");
module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json("Access Denied");
  const contentArr = authHeader.split(" ");
  if (contentArr.length !== 2 || contentArr[0] !== "Bearer")
    return res.status(401).json("Access Denied");

  const decode = validateToken(contentArr[1]);
  if (!decode) {
    return res.status(401).json("Access Denied");
  }

  req.user = decode;
  return next();
};
