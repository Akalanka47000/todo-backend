const asyncHandler = require('../middleware/async')

// @desc    Health check
// @route   GET /api/v1/
// @access  Public

const handleHealthRequest = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ message: 'Todo backend up and running!' })
})

module.exports = handleHealthRequest
