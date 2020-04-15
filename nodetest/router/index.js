let App = require('./config')

// let test = require('./test')
// let email = require('./email')
let join = require('./join/index')

// 1. Using router
// App.router.use('/test', test)
// App.router.use('/email', email)
App.router.use('/join', join)

module.exports = App.router

// module.exports = class router {
//   constructor(app) {
//     // '/main' 로 이동시 main 라우터를 실행해줘
//     app.use('/main', main)
//     app.use('/email', email)
//   }
// }
