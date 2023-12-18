// controllers/dishController.js
const dishService = require('../services/dishService')

// @method     - get
// @access     - public
// @endpoint   - /dishes
// @desc       - to get all dishes from DB
const getDishes = async (req, res) => {
  try {
    const results = await dishService.getDishes()
    return res.status(200).send(results)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
}

// @method     - get
// @access     - public
// @endpoint   - /dishes/popular
// @desc       - to get all popular dishes from DB
const getPopularDishes = async (req, res) => {
  try {
    const results = await dishService.getPopularDishes()
    return res.status(200).send(results)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
}

module.exports = { getDishes, getPopularDishes }
