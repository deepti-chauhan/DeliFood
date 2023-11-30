const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  addressId: {
    type: String,
  },
  addressType: {
    type: String,
  },
  addressLocation: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
  },
  address: [addressSchema],
})

const User = mongoose.model('users', userSchema)

module.exports = User
