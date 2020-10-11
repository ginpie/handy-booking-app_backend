const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

function generateToken(id) {
  const token = jwt.sign({ id }, JWT_KEY, { expiresIn: "1h" });
  return token;
}

function validateToken(token) { 
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (e) {
    return null;
  }
  return payload;
}
module.exports = { generateToken, validateToken };
