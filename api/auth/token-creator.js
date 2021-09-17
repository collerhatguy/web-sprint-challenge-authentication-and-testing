const jwt = require("jsonwebtoken")

const JWT_SECRET = "SUPER SECRET SECRET"

const tokenCreator = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        password: user.password,
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(
        payload,
        JWT_SECRET,
        options
    )
}

module.exports = {
    JWT_SECRET,
    tokenCreator
}