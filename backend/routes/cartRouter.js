const express = require('express')
const router = express.Router()

const {getItems, addItem ,removeItem} = require('../controllers/cartController')

router.post('/cart/addItem', addItem )
router.get('/cart/items',getItems)
router.delete('/cart/removeItem', removeItem)

module.exports = router