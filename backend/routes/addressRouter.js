const express = require('express')
const router = express.Router()

const {
  deleteAddress,
  getAddress,
  getAllAddress,
  setAddress,
} = require('../controllers/addressController')

router.post('/address', getAddress)
router.post('/newaddress', setAddress)
router.post('/alladdress', getAllAddress)
router.post('/deleteAddress', deleteAddress)

module.exports = router
