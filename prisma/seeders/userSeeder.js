const { register } = require('../../src/api/services/auth')
const { fetchUserByEmail } = require('../../src/api/repository/user')

const seed = async () => {
  const user = await fetchUserByEmail('akalankaperera128@gmail.com')
  if (!user) await register('akalanka47', 'akalankaperera128@gmail.com', '123456')
}

module.exports = seed
