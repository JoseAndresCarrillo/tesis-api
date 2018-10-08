const Router = require('koa-router')
const _ = require('lodash')

const router = new Router()

router.get('/', async ctx => {
  const admin = _.omit(ctx.state.admin.toJSON(), 'auth.password')
  ctx.body = { user: admin }
})

router.put('/', async ctx => {
  const body = _.pick(ctx.request.body, ['name', 'charge', 'auth.password', 'avatar'])
  const { admin } = ctx.state
  _.merge(admin, body)
  await admin.save()
  _.unset(admin, 'auth.password')
  ctx.body = { message: 'Actualizado', admin }
})

module.exports = [
  router.routes(),
  router.allowedMethods()
]
