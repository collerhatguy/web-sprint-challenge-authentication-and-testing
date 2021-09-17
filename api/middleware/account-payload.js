

module.exports = (req, res, next) => {
    const { username, password } = req.body
    if (!username || !username.trim() || !password || !password.trim()) {
       return next({ status: 404, message: "username and password required"})
    }
    next()
}
