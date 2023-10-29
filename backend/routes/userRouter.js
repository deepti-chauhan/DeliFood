const express = require('express')
const router = express.Router()

const { loginUser, registerUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/', loginUser)

module.exports = router
