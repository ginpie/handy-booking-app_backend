const { generateToken,validateToken } = require("../utils/jwt");
// const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { JWT_KEY } = process.env;

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
  const unSeeUser = {
    id: existUser.id,
    email: existUser.email,
  };
  const token = generateToken(existUser.id);
  return res.set("X-Auth-Token", token).status(200).json(unSeeUser);
  
}

async function stayLogIn(req,res){
  const token = req.get("X-Auth-Token");
  // console.log(token);
  if(!token){
    return res.status(404).json("Not Found User");
  }
  try{
    const result = validateToken(token,JWT_KEY);
    if(!result){
      return res.status(404).json("Not Found User")
    }
    // console.log('0')
    // console.log(result)
    // console.log(result.id)
    // console.log('1')
    const user = await UserModel.findById(result.id).exec();
    // console.log(user)
    if(!user){
      return res.status(404).json("Not Found User")
    }
    const unSeeUser = { 
      id: user.id,
      email: user.email,
    };
    console.log(unSeeUser)
    return res.status(200).json(unSeeUser);
  }
    catch(e){
      if (e.name ==="TokenExpiredError")
      {
        return res.status(401).json("Access Denied");
      }
      throw e 
    }
  
}
module.exports = { logInUser, stayLogIn };
