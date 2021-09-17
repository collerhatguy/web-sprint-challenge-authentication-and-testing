const router = require('express').Router()
const usernameUnique = require("../middleware/username-unique")
const usernameExists = require("../middleware/username-exists")
const bcrypt = require("bcrypt")
const { create } = require("./auth-modal")
const { tokenCreator } = require("./token-creator")

router.post('/register', usernameUnique, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  create({ username, password: hash }).then(user =>
    res.status(201).json(user)
  ).catch(next)
})

router.post('/login', usernameExists, (req, res, next) => {
  const { user, body } = req
  
  if (bcrypt.compareSync(body.password, user.password)) {
    const token = tokenCreator(user)
    res.status(200).json({
      token,
      message: `welcome, ${body.username}`
    })
  } else {
    next({ status: 401, message: "invalid credentials" })
  }
})

module.exports = router
