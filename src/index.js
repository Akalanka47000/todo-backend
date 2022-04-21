const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
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
