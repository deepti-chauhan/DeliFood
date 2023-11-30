const express = require('express')
const router = express.Router()

const { loginUser, registerUser, deleteUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login' ,loginUser)
router.delete('/delete', deleteUser )

module.exports = router
