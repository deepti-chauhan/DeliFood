const express = require('express')
const router = express.Router()

const {
  createOrder,
  getOrders,
  getAddress,
  setAddress,
  getAllAddress,
} = require('../controllers/orderController')

router.post('/orders', createOrder)
router.post('/orderhistory', getOrders)
router.post('/address', getAddress)
router.post('/newaddress', setAddress)
router.post('/alladdress', getAllAddress)

module.exports = router
