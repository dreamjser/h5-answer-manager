// server.js
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create('./')
const middlewares = jsonServer.defaults()
const routerUser = jsonServer.router(path.join(__dirname, 'user.js'))
const routerQuestionGroup = jsonServer.router(path.join(__dirname, 'question_group.js'))
const routerQuestion = jsonServer.router(path.join(__dirname, 'question.js'))
const routerTag = jsonServer.router(path.join(__dirname, 'tag.js'))
const routerCustomer = jsonServer.router(path.join(__dirname, 'customer.js'))

function renderResponse(req, res) {
  setTimeout(() => {
    res.jsonp({
      errorCode: '0',
      errorMsg: 'success',
      data: res.locals.data
    })
  }, 100)
}

server.use(middlewares)
server.use('/answer-manager-api/user', routerUser)
server.use('/answer-manager-api/questionGroup', routerQuestionGroup)
server.use('/answer-manager-api/question', routerQuestion)
server.use('/answer-manager-api/tag', routerTag)
server.use('/answer-manager-api/customer', routerCustomer)

routerUser.render = renderResponse
routerQuestionGroup.render = renderResponse
routerQuestion.render = renderResponse
routerTag.render = renderResponse
routerCustomer.render = renderResponse

server.listen(4002, () => {
  console.log('JSON Server is running')
})
