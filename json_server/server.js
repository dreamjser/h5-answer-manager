// server.js
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create('./')
const middlewares = jsonServer.defaults()
const routerUser = jsonServer.router(path.join(__dirname, 'user.json'))

function renderResponse(req, res) {
  setTimeout(() => {
    res.jsonp({
      errorCode: '0',
      errorMsg: 'success',
      data: res.locals.data
    })
  }, 400)
}

server.use(middlewares)
server.use('/answer-manager-api/user', routerUser)
routerUser.render = renderResponse

server.listen(4002, () => {
  console.log('JSON Server is running')
})
