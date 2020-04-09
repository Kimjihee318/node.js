let basic = require('./basic.service')
let mysql = require('./mysql.service')

module.exports = function service(app) {
  basic(app)
  mysql(app)
}
