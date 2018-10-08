require('./env')
const http = require('http')
const mongoose = require('mongoose')
const { app } = require('./app/routes')

// Set database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', initServer)

// Start
function initServer () {
  // Use db instance in app context
  app.context.db = db

  // Server instance
  const server = http.Server(app.callback())

  const port = process.env.PORT || 3050
  const mode = process.env.NODE_ENV
  server.listen(port, () => console.log(`Listening on ${port} in ${mode}`))
}
