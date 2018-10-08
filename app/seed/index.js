require('../../env')
const mongoose = require('mongoose')
const { createAdmin } = require('./admin')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error)
db.once('open', run)

async function run () {
  try {
    await createAdmin()
    console.log('Admin created')
  } catch (e) {
    console.log(e.message)
  } finally {
    db.close()
  }
}
