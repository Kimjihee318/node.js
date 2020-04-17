let basic = require('./basic')
let errorPage = require('./errorPath')

module.exports = class Router {
  constructor(router) {
    basic(router)
  }
}