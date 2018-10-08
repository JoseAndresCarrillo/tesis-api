const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
  ctx.body = { message: 'Client' }
})

// const children = [
//   ...[
//     '/natural-region',
//     '/region',
//     '/province',
//     '/district',
//     '/tourist-place'
//   ].map(p => '/basics' + p),
//   ...[
//     '/form'
//   ].map(p => '/contact' + p)
//   // ...[
//   //   '/adventure-module',
//   //   '/adventure',
//   //   '/lodging',
//   //   '/restaurant',
//   //   '/tickets',
//   //   '/nightlife'
//   // ].map(p => '/business' + p)
//   // '/contact-form',
//   // '/posts'
// ]
//
// for (let r of children) {
//   router.use(r, ...require('.' + r))
// }

module.exports = [
  router.routes(),
  router.allowedMethods()
]
