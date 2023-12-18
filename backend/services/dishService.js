// services/dishService.js
const Dish = require('../models/dishes');

const getDishes = async () => {
  return await Dish.find({});
};

const getPopularDishes = async () => {
  return await Dish.find({ popular: true });
};

module.exports = { getDishes, getPopularDishes };
