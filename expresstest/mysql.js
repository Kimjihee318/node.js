let mysql = require('mysql')
let __P = require('./primitives/password')

module.exports = function SQL(router) {
  // * 설정 정보 객체 넣어줌
  let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    // port: '3306', // * mysql port!
    user: 'root',
    password: __P.PASSWORD,
    database: 'test',
    debug: false
  })

  let addUser = function(id, name, age, password, callback) {
    // *  pool에서 연결을 받아옴 | conn = connection
    pool.getConnection((err, conn) => {
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

  let authUser = function(id, password, callback) {
    pool.getConnection((err, conn) => { 
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

  router.route('/database/sqlsignup').post((req,res) => {
    console.log('라우트 호출')
    let paramId = req.body.id || req.query.id
    let paramName = req.body.name || req.query.name
    let paramPassword =  req.body.password || req.query.password
    let paramAge =  Number(req.body.age || req.query.age)

    // *                                                       추가된 데이터 리턴
    addUser(paramId, paramName, paramAge, paramPassword, (err, addedUser) => {
      if(err) {
        console.log(err);
        console.log('addUser sql 에러 발생');
        // * 에러 발생시 화면에서 처리
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
        res.write('<div>에러발생</div>')
        res.end()
        return
      }

      if(addedUser) {
        console.dir(addedUser);
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
        res.write(`<div>회원가입 성공 : ${JSON.stringify(addedUser)}</div>`)
        res.end()
      } else {
        // * null값
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
        res.write(`<div>가입 안됨</div>`)
        res.end()
      }
    })
  })
}

