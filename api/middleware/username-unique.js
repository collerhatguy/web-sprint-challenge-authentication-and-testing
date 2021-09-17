
const { findBy } = require("../auth/auth-modal")

module.exports = (req, res, next) => {
    const { username } = req.body
    findBy({ username }).then(([user]) => {
        if (user) {
            next({ status: 401, message: "username taken" })
        } else {
            next()
        }
    }).catch(next)
}