const express = require('express')

const router = express.Router()

const handleHealthRequest = require('../controllers/health')

router.get('/',handleHealthRequest)

module.exports = router
