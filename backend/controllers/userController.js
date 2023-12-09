const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const SECRET_KEY = process.env.JWT_SECRET_KEY
const User = require('../models/user')

//  @method     - post
//  @access     - public
//  @endpoint   - /user/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).send({ error: 'All fields are required!!' })
    }

    const user = await User.findOne({ email: email })

    if (!user) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const userId = uuid.v4()

      const newUser = new User({
        userId: userId,
        username: username,
        email: email,
        password: hashPassword,
      })

      await newUser.save()
      res.status(201).send({ message: 'user registered successfully!!' })
    } 
    else {
      return res.status(400).send({ message: 'user already exist' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'regitration failed' })
  }
}

//  @method     - post
//  @access     - public
//  @endpoint   - /user/login
const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(400).send({ message: 'user not registered !!' })
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password)

  if (isPasswordMatching) {
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      SECRET_KEY
    )
    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
      },
      token: token,
      message: 'user login successfully!!',
    })
  }

  return res.status(400).send({ message: 'Incorrect login credentials' })
}

//  @method     - delete
//  @access     - private
//  @endpoint   - /user/delete
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body
    await User.deleteOne({ email: email })

    return res.status(200).send({ message: 'account deleted !!' })
  } catch (e) {
    console.log('internal error')
  }
}

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
}
