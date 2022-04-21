const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: '/',
})

module.exports = axiosInstance
