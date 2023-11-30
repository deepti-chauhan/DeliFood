const express = require('express')
const router = express.Router()

const {
  orderHisory,
  createOrder,
  orderSummary,
} = require('../controllers/orderController')
const { authenticateToken } = require('../middleware/authMiddleware')

router.post('/order/create', authenticateToken, createOrder)
router.get('/order/history', authenticateToken, orderHisory)
router.get('/order/summary', authenticateToken, orderSummary)

module.exports = router
