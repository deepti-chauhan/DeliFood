const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const SECRET_KEY = process.env.JWT_SECRET_KEY
const User = require('../models/user')
const Token = require('../models/token')
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail')

//  @method     - post
//  @access     - public
//  @endpoint   - /user/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).send({ error: 'All fields are required!!' })
    }

    let user = await User.findOne({ email: email })
    console.log(user)

    if (!user) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const userId = uuid.v4()

      user = await new User({
        userId: userId,
        username: username,
        email: email,
        password: hashPassword,
      }).save()

      const token = await new Token({
        userId : user.userId,
        token: crypto.randomBytes(32).toString('hex')
      }).save()


      const url = `${process.env.BASE_URL}/${user.userId}/verify/${token.token}`;
		  await sendEmail(user.email, url);


      res.status(201).send({ message: 'An email sent to your account please verify!!' })
    } 
    else {
      return res.status(400).send({ message: 'user already exist with this email' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'regitration failed' })
  }
}

//  @method     - post
//  @access     - public
//  @endpoint   - /user/login
const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
  
    if (!user) {
      return res.status(400).send({ message: 'user not registered !!' })
    }
  
    const isPasswordMatching = await bcrypt.compare(password, user.password)
  
    if(!isPasswordMatching) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user.userId });
        if (!token) {
          token = await new Token({
            userId: user.userId,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}/${user.userId}/verify/${token.token}`;
          await sendEmail(user.email, url);
        }
  
        return res
          .status(400)
          .send({ message: "An Email sent to your account please verify" });
    }

    //if password is correct and user is verfied lets get log in 

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
    
  } catch (error) {
    console.log(error)
  }


  return res.status(400).send({ message: 'Incorrect login credentials' })
}


//  @method - get
const getUser = async (req, res) => {
  try {
		const user = await User.findOne({ userId: req.params.userId });
    console.log('user exist : ', user)
    
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user.userId,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ userId: user.userId, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
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
  getUser,
  deleteUser,
}
