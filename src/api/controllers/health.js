const asyncHandler = require('../middleware/async')

const handleHealthRequest = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ message: 'Todo backend up and running!' })
})

module.exports = handleHealthRequest
