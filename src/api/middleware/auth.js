const asyncHandler = require('./async')
const authService = require('../services/auth')
const errorResponse = require('../utils/errorResponse')

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req)
    if (!user) return errorResponse(res, 'Not authorized to access this route', 401)
    req.user = user
    next()
  } catch (err) {
    return errorResponse(res, err, 500)
  }
})

module.exports = protect
