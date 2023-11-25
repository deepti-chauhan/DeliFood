const Dish = require('../models/dishes')

//  @method     - get
//  @access     - public
//  @endpoint   - /dishes
const getDishes = async (req, res) => {
  const results = await Dish.find({})
  return res.status(200).send(results)
}

//  @method     - get
//  @access     - public
//  @endpoint   - /dishes/popular
const getPopularDishes = async (req, res) => {
  const results = await Dish.find({ popular: true })
  return res.status(200).send(results)
}

module.exports = { getDishes, getPopularDishes }
