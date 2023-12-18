const express = require('express')
const router = express.Router()

const { loginUser, registerUser, deleteUser, getUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login' ,loginUser)
router.delete('/delete', deleteUser )
router.get('/:userId/verify/:token', getUser)

module.exports = router
