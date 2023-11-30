const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: { type: Number, default: 0 },
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart
