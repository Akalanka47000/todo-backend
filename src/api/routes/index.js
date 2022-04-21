const express = require('express')

const router = express.Router()

const healthRouter = require('./health')

router.use('/', healthRouter);

module.exports = router