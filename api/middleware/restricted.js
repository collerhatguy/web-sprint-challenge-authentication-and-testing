const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../auth/token-creator")

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    next({ status: 404, message: "token required" })
  } else {
    jwt.verify(
      authorization,
      JWT_SECRET,
      (err, decoded) => {
        if (err) {
          next({ status: 401, message: "token invalid" })
        } else {
          req.decodedJWT = decoded
          next()
        }
      }
    )
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
