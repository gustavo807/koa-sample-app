const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

let users = [
    {
        name: 'Joe',
        email: 'joe@gmail.com'
    },
    {
        name: 'Kelly',
        email: 'kelly@gmail.com'
    },
    {
        name: 'John',
        email: 'john@gmail.com'
    }
]

// All users
router.get('/users', ctx => {
    ctx.body = users
})

// User by Id
router.get('/users/:id', ctx => {
    ctx.body = users[ctx.params.id]
})

// Update User by Id
router.put('/users/:id',  ctx => {
    ctx.body = Object.assign(users[ctx.params.id], ctx.request.body)
})

// Add new user
router.post('/users',  ctx => {
    users.push(ctx.request.body)
    ctx.body = users
})

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes())

app.listen(3000)    