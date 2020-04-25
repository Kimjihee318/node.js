let mysql = require('mysql')
let __P = require('../primitives/password')

class SQL {
  constructor() {
    // * 설정 정보 객체 넣어줌
    // * 풀링은 데이터베이스 연결의 캐시이며, 데이터베이스에 대한 미래의 요구가 필요할 때 연결을 재사용 할 수 있도록합니다. 
    // * 연결 풀은 데이터베이스에서 명령을 실행하는 성능을 향상시키기 위해 사용됩니다.
    let pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      // port: '3306', // * mysql port!
      user: 'root',
      password: __P.PASSWORD,
      database: 'test',
      debug: false
    })

    this.pool = pool
  }
  addUser(id, name, age, password, callback) {
    // *  pool에서 연결을 받아옴 | conn = connection
    this.pool.getConnection((err, conn) => {
      if(err) {
        if(conn) {
          conn.release()
        }
        callback(err, null)
        return
      }
      console.log('데이터베이스 연결 스레드 아이디: ', conn.thradId)

      let data = { id: id, name: name, age: age, password: password }
      // * 결과값이 리턴됨 | SQL이 어떻게 실행되는지 알수있다.
      let exec = conn.query(`INSERT INTO users SET ?`, data, (err, result) => {
        conn.release()

        if(err) {
          console.log('SQL 에러 발생');
          callback(err, null)
        }

        callback(null, result)
      })
    })
  }

  authUser(id, password, callback) {
    this.pool.getConnection((err, conn) => { 
      if(err) {
        if(conn) {
          conn.release()
        }
        callback(err, null)
        return
      }
      let tablename = 'users'
      let columns = ['id', 'password']
      //                            *       *             *                *    순서대로 물음표를 대체함
      let exec = conn.query('SELECT ?? FROM ?? WHERE id = ? AND password = ?', [columns, tablename, id, password], (err, records) => {
        conn.release()
        if(err) callback(err, null)

        if(records.length > 0) {
          console.log('일치하는 사용자를 찾음');
          callback(null, docs)
        } else {
          console.log('일치하는 사용자를 찾지 못함');
          console.log(null, null);
        }
      })
    })
  }
}

module.exports =  new SQL()
