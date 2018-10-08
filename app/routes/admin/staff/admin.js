const Router = require('koa-router')
const Admin = require('../../../models/staff/Admin')

const router = new Router()

router.get('/', async ctx => {
  ctx.body = await Admin.find({}, '-auth.password')
})

// router.post('/', async ctx => {
//   await Admin.create(ctx.request.body)
//   ctx.body = { message: 'Creado' }
// })

router.put('/:_id', async ctx => {
  const admin = await Admin.findOne(ctx.params)
  ctx.assert(admin, 404)
  await admin.save()
  ctx.body = { message: 'Actualizado!' }
})

router.del('/:_id', async ctx => {
  const { n } = await Admin.remove(ctx.params)
  ctx.assert(n, 404)
  ctx.body = { message: 'Eliminado' }
})

module.exports = [
  router.routes(),
  router.allowedMethods()
]
