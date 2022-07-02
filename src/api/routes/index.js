const express = require('express')

const router = express.Router()

const healthRouter = require('./health')
const authRouter = require('./auth')

router.use('/', healthRouter);
router.use('/auth', authRouter);

module.exports = router