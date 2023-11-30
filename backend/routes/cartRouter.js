const express = require('express')
const { authenticateToken } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getItems,
  addItem,
  removeItem,
  decreaseItemCount
} = require('../controllers/cartController')

router.post('/cart/addItem', authenticateToken, addItem)
router.get('/cart/items', authenticateToken, getItems)
router.delete('/cart/removeItem', authenticateToken, removeItem)
router.delete('/cart/removeItemByOne', authenticateToken, decreaseItemCount)

module.exports = router
