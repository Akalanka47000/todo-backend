const express = require('express')

const router = express.Router()

const healthRouter = require('./health')
const authRouter = require('./auth')
const taskRouter = require('./task')
const statusRouter = require('./status')

router.use('/', healthRouter);
router.use('/auth', authRouter);
router.use('/task', taskRouter);
router.use('/status', statusRouter);

module.exports = router