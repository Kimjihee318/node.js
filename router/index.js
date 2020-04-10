let App = require('./config')

let main = require('./main')
let email = require('./email')

// 1. Using router
App.router.use('/main', main)
App.router.use('/email', email)

module.exports = App.router

// module.exports = class router {
//   constructor(app) {
//     // '/main' 로 이동시 main 라우터를 실행해줘
//     app.use('/main', main)
//     app.use('/email', email)
//   }
// }
