const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
  dishId: {
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

const Dish = mongoose.model('dishes', dishSchema)

module.exports = Dish
