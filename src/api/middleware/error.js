const logger = require('../utils/logger')
const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  logger.error(err)

  // Log to console for dev
  if (process.env.NODE_ENV !== 'production') console.log(err)

  return errorResponse(res, error.message || 'Server Error', error.statusCode || 500)
}

module.exports = errorHandler
