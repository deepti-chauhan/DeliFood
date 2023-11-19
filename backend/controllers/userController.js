const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const UserModel = require('../models/user')
const secretKey = process.env.JWT_SECRET_KEY

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
      const userId = uuid.v4()

      const newUser = new UserModel({
        userId: userId,
        username: username,
        email: email,
        password: hashPassword,
      })

      await newUser.save()

      const token = jwt.sign({ userId: userId }, secretKey)
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
    return res.status(400).send({ message: 'user not registered !!' })
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password)

  if (isPasswordMatching) {
    const token = jwt.sign({ userId: user._id }, secretKey)
    return res.status(200).json({
      user: user,
      token: token,
    })
  }

  return res.status(401).send({ message: 'Incorrect login credentials' })
}

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body
    await UserModel.deleteOne({ email: email })

    return res.status(200).send({ message: 'account deleted !!' })
  } catch (e) {
    console.log('internal error')
  }
}

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
}
