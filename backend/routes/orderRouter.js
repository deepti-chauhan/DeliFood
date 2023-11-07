const express = require('express')
const router = express.Router()

const { createOrder, getOrders, getAddress } = require('../controllers/orderController')

router.post('/orders', createOrder)
router.post('/orderhistory', getOrders)
router.post('/address', getAddress)

module.exports = router
