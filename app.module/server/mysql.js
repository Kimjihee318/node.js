let mysql = require('mysql')


module.exports = class Mysql {
  constructor() {
    this.connection = mysql.createConnection({
      host     : '127.0.0.1',
      port     : '3306',
      user     : 'root',
      password : 'wlgmltjqj',
      database : 'nodeserver'
    })
  }
  // * getter connection
  getConnection() {
    return this.connection
  }
}



