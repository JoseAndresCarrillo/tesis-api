const Router = require('koa-router')
const Admin = require('../../models/staff/Admin')
const koaJwt = require('koa-jwt')
const router = new Router()

router.get('/', async ctx => {
  ctx.body = { message: 'Admin' }
})

// Expose auth routes
router.use('/auth', ...require('./auth'))

// Enable JWT for the next routes
router.use(koaJwt({ secret: process.env.APP_SECRET, key: 'jwtdata' }))

// Set admin
router.use(async (ctx, next) => {
  const { id } = ctx.state.jwtdata
  const admin = await Admin.findOne({ _id: id })
  ctx.assert(admin, 401, 'Admin doesn\'t exist!')
  ctx.state.admin = admin
  await next()
})

// Children routes
const children = [
  // '/courses',
  '/staff/admin',
  // '/posts',
  // '/post-categories',
  '/account'
]

for (let r of children) {
  router.use(r, ...require('.' + r))
}

// Export
module.exports = [router.routes(), router.allowedMethods()]
