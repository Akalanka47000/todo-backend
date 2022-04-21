const express = require('express')

const router = express.Router()

const statusController = require('../controllers/status')

const protect = require('../middleware/auth')

router.get('/', protect, statusController.getStatusList)

module.exports = router
