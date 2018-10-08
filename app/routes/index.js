const moment = require('moment-timezone')
const Koa = require('koa')
const cors = require('@koa/cors')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const mount = require('koa-mount')
const Router = require('koa-router')
const compress = require('koa-compress')

const app = new Koa()
const router = new Router()

app.use((ctx, next) => {
  return next().catch(e => {
    // Mongoose errors
    const me = ['CastError', 'ValidationError'].includes(e.name)

    // Normal flow
    ctx.status = e.status || (me ? 400 : 500)
    ctx.body = { message: e.message }
    ctx.app.emit('error', e, ctx)
  })
})

app.use(logger())
app.use(cors())
app.use(compress())
app.use(serve('public'))
app.use(mount('/storage', serve('storage')))
app.use(bodyParser({ jsonLimit: '5mb' }))

router.get('/', async ctx => {
  ctx.body = {
    message: 'Welcome to Cuyes API !',
    time: moment.tz('America/Lima').format()
  }
})

router.use('/client', ...require('./client'))
router.use('/admin', ...require('./admin'))

app.use(router.routes())
app.use(router.allowedMethods())

// catch 404 and forward to error handler
app.use(async ctx => ctx.throw(404))

module.exports = { app }
