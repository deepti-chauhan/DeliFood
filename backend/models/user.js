// import { model } from 'mongoose'

const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
  },
  addressType: {
    type: String,
  },
  addressLocation: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  postalCode: {
    type: String,
    // required: true,
  },
})

const UserModel = mongoose.model('users', {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: [addressSchema],
})

module.exports = UserModel
``