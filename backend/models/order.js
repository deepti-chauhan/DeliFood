const mongoose = require('mongoose')
const today = new Date()

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  orderedItems: [],
  shippingAddress: [],
  orderTotal : {
    type : Number,
    required : true
  },
  createdAt: {
    type: String,
    default: new Date()
  },
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order
