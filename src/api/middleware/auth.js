const asyncHandler = require('./async')
const authService = require('../services/auth')
const { fetchUserById } = require('../repository/user')
const errorResponse = require('../utils/errorResponse')

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  try {
    const decodedUser = await authService.getCurrentUser(req)
    const user = decodedUser ? await fetchUserById(decodedUser.id) : null
    if (!user) return errorResponse(res, 'Not authorized to access this route', 403)
    req.user = user
    next()
  } catch (err) {
    return errorResponse(res, err, 500)
  }
})

module.exports = protect
