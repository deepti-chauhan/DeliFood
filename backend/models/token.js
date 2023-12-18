const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'users',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, //1hour
  },
})

const Token = mongoose.model('tokens', tokenSchema)

module.exports = Token
