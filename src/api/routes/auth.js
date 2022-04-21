const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth')

const protect = require("../middleware/auth");

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/logout', authController.logout)
router.get('/user', protect, authController.getCurrentUser)

module.exports = router
