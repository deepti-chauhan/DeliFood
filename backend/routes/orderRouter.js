const express = require('express')
const router = express.Router()

const { orderHisory, placeOrder } = require('../controllers/orderController')

router.post('/placeorder', placeOrder)
router.get('/orderhistory', orderHisory)

module.exports = router
