const jwt = require("jsonwebtoken");
const JWT_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZxcOa0xQL0BMPg/CuR6B3HYH+FMhdf73LitiAGHMoGfto7moTYy1PcAIwGK2tbhO9zZp0mlArOpVrWdnOIXHaVbDwj0Rt93CnTvC90X7QhVxVTJYB0mKdQtVJ0sbFFKjYkgzs2QHwiyAomGtDD3GY5vLYOZjoeQT0N6LJo8NTiQIDAQAB";

function generateToken(id) {
  const token = jwt.sign({
    id
  }, JWT_KEY, {
    expiresIn: "1h"
  });
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
module.exports = {
  generateToken,
  validateToken
};