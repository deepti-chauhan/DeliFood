const express = require('express')
const router = express.Router()

const { deleteAddress } = require('../controllers/addressController')

router.post('/deleteAddress', deleteAddress)

module.exports = router