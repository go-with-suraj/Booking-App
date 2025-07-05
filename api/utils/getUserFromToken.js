const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

function getUserFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) return reject(err);
      resolve(userData);
    });
  });
}

module.exports = getUserFromToken;
