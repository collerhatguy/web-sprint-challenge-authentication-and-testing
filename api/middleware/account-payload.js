

module.exports = (req, res, next) => {
    const { username, password } = req.body
    if (!username || !username.trim()) {
       return next({ status: 404, message: "username required"})
    }
    if (!password || !password.trim()) {
       return next({ status: 404, message: "password required"})
    }

    next()
}
