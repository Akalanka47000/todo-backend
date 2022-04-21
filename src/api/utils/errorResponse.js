const errorResponse = (res, error, status) => {
  res.status(status).json({ success: false, error: error })
}
module.exports = errorResponse
