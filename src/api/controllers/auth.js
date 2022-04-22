const authService = require('../services/auth')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const { sendTokenResponse } = require('../utils/jwt')
const logger = require('../utils/logger')

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validate request body
    if (!username) return errorResponse(res, 'Please provide a username', 400)
    if (!email) return errorResponse(res, 'Please provide an email', 400)
    if (!password) return errorResponse(res, 'Please provide a password', 400)

    const user = await authService.register(username, email, password)
    if (user) return sendTokenResponse(res, user)
    return errorResponse(res, 'Failed to register user', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

const login = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await authService.login(username, email, password)
    if (user) return sendTokenResponse(res, user)
    return errorResponse(res, 'Invalid Credentials', 401)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: 'Logout success',
  })
})

// @desc    Get current user
// @route   GET /api/v1/auth/user
// @access  Private

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req)
    if (user) return res.status(200).json({ success: true, data: user })
    return errorResponse(res, 'Failed to get user', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})


// @desc    Delete currently logged in user
// @route   DELETE /api/v1/auth/user
// @access  Private

const deleteCurrentUser = asyncHandler(async (req, res) => {
  try {
    const result = await authService.deleteCurrentUser(req)
    if (result) return res.status(200).json({ success: true, message: 'Account deleted successfully' })
    return errorResponse(res, 'Failed to delete user account', 422)
  } catch (e) {
    logger.error(e)
    return errorResponse(res, e, 500)
  }
})

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  deleteCurrentUser,
}
