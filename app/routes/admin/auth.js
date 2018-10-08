const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/staff/Admin')

const router = new Router()

router.post('/login', login)

module.exports = [
  router.routes(),
  router.allowedMethods()
]

async function login (ctx, next) {
  const body = ctx.request.body
  const admin = await Admin.findOne({ 'auth.email': body.email })
  ctx.assert(admin, 401, 'Auth failed! (Admin not found)')
  const match = await admin.auth.comparePassword(body.password)
  ctx.assert(match, 401, 'Auth failed! Wrong password')
  const token = jwt.sign({ id: admin._id, type: 'admin' }, process.env.APP_SECRET)
  ctx.body = { token, message: 'Auth success' }
}
