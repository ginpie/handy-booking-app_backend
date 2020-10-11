const { generateToken } = require("../utils/jwt");
const UserModel = require("../models/user");

async function logInUser(req, res) {
  const { email, password } = req.body;
  const existUser = await UserModel.findOne({ email }).exec();
  if (!existUser) {
    return res.status(409).json("Invalid Exmail or Password");
  }
  const validatePassword = await existUser.validatePassword(password);
  if (!validatePassword) {
    return res.status(401).json("Invalid Exmail or Password");
  }

  const token = generateToken(existUser._id);
  return res.json({ email, token });
}
module.exports = { logInUser };
