
const { findBy } = require("../auth/auth-modal")

module.exports = (req, res, next) => {
    const { username } = req.body
    findBy({ username }).then(([user]) => {
        if (user) {
            req.user = user
            next()
        } else {
            next({ status: 404, message: "invalid credentials" })
        }
    }).catch(next)
}
