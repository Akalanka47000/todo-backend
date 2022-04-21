const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const winston = require('winston')
const colors = require('colors')
const errorHandler = require('./api/middleware/error')
const errorResponse = require('./api/utils/errorResponse')
require('dotenv').config()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Cookie parser
app.use(cookieParser())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Error handler
app.use(errorHandler)

const routes = require('./api/routes')

// Register routes
app.use('/api/v1', routes)

// 404 handler
app.get('*', (req, res) => {
  return errorResponse(res, 'Route not found', 404)
})

// Logging
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: `logs/error/${new Date().toISOString().slice(0, 10)}.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `logs/info/${new Date().toISOString().slice(0, 10)}.log`,
      level: 'info',
    }),
  ],
})

// Dev console logging
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  )
}

const PORT = process.env.PORT || 4000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
