const app = require('../src/server')
const testBase = require('./testBase')

let testSession

/**
 * Create a super test session and initiate the database before running tests.
 */
beforeAll(async () => {
  testSession = testBase.createSuperTestSession(app)
})

/**
 * Take down the app and reset database once the test execution is done
 */
afterAll((done) => {
  testBase.resetDatabase()
  app.close(done)
})

describe('Authentication', () => {
  const username = 'akalanka7'
  const email = 'akalankaperera@gmail.com'
  const password = '123456'
  test('Register User', async () => {
    await testSession.post('/api/v1/auth/register').send({ username, email, password }).expect(200)
  })
  test('Logout User', async () => {
    await testSession.post('/api/v1/auth/logout').expect(200)
  })
  test('Login User', async () => {
    await testSession.post('/api/v1/auth/login').send({ username, password }).expect(200)
  })
  test('Get Current User', async () => {
    await testSession.get('/api/v1/auth/user').expect(200)
  })
  test('Delete Current User', async () => {
    await testSession.delete('/api/v1/auth/user').expect(200)
  })
})
