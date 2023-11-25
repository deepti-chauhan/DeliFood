const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  popular: {
    type: Boolean,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const Dish = mongoose.model('dishes', productSchema)

module.exports = Dish
