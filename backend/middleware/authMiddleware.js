const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY
// const SECRET_KEY = secretKey

const authenticateToken = async (req, res, next) => {
  let token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorised User : Token not Found' })
  }

  console.log(" token : " + token)
  try {
    const decoded =  jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { authenticateToken }
