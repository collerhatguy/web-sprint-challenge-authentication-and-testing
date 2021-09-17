const { findBy } = require("../auth/auth-modal")

module.exports = (req, res, next) => {
    req.user = req.body
    next()
}
