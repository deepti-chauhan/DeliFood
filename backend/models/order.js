const mongoose = require('mongoose')

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
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order
