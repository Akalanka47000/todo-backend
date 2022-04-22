const statusSeeder = require('./statusSeeder')
const userSeeder = require('./userSeeder')

statusSeeder()
if (process.env.NODE_ENV == 'testing') userSeeder()
