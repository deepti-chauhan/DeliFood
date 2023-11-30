const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const {
  deleteAddress,
  getAllAddress,
  setAddress,
  updateAddress
} = require('../controllers/addressController')

router.get('/alladdress', authenticateToken, getAllAddress)
router.post('/address/create', authenticateToken, setAddress)
router.put('/address', authenticateToken, updateAddress)
router.delete('/address', authenticateToken, deleteAddress)

module.exports = router
