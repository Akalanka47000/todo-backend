const session = require('supertest-session')
const { execSync } = require('child_process')

const authenticateTestSession = (testSession) => {
  const username = 'akalanka47'
  const email = 'akalankaperera128@gmail.com'
  const password = '123456'
  return new Promise((resolve, reject) => {
    testSession
      .post('/api/v1/auth/login')
      .send({ username, email, password })
      .expect(200)
      .end((err) => {
        if (err) reject(err)
        resolve()
      })
  })
}

const resetDatabase = () => {
  execSync('npm run testdb:reset')
  execSync('npm run testdb:seed')
}

const createSuperTestSession = (app) => {
  return session(app)
}

module.exports = {
  authenticateTestSession,
  resetDatabase,
  createSuperTestSession,
}
