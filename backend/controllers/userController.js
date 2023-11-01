// const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const jwtSecretKey = 'my_secret_key'

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required!!' })
    }

    const user = await UserModel.findOne({ email: email })

    if (!user) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const newUser = new UserModel({
        username: username,
        email: email,
        password: hashPassword,
      })

      const userCreated = await newUser.save()

      const token = jwt.sign({ userId: userCreated._id }, jwtSecretKey)
      res.status(200).json({ user: newUser, token: token })
    } else {
      return res.status(400).send('user already exist')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error!!' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email: email })

  if (!user) {
    return res.status(400).send({message : "user not found !!"})
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password)

  if (isPasswordMatching) {
    const token = jwt.sign({ userId: user._id }, jwtSecretKey)
    return res.status(200).json({
      user: user,
      token: token,
    })
  }

  return res.status(401).send('Incorrect login credentials')
}

module.exports = {
  loginUser,
  registerUser,
}
