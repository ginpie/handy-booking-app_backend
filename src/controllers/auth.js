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
  const authorization = `Bearer ${token}`
  // console.log("1")
  // console.log(authorization)
  return res.set('Authorization',authorization).status(200).json(unSeeUser);
}

async function stayLogIn(req,res){
  const token = req.get("Authorization");
  if(!token){
    return res.status(404).json("Not Found User");
  }
  // console.log(token);
  const contentArr = token.split(" ");
  if (contentArr.length !== 2 || contentArr[0] !== "Bearer")
    return res.status(401).json("Access Denied");
  try{
    const result = validateToken(contentArr[1],JWT_KEY);
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
    // console.log(unSeeUser)
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
