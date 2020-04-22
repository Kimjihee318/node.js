let Database = require('../database')
module.exports = function signupService(res, database, id, name, password) {
  if(database) {                                    // * callback
    new Database().addUser(database, id, password, name,(err, result) => {
    if(err) {
    console.log('에러 발생');
    // * 에러 발생시 화면에서 처리
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
    res.write('<div>에러발생</div>')
    res.end()
    return
    }

    if(result) {
      console.dir(result);
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
      res.write(`<div>회원가입 성공 : ${JSON.stringify(result[0])}</div>`)
      res.end()
    } else {
      // * null값
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
      res.write(`<div>가입 안됨</div>`)
      res.end()
    }
    })
  } else {
  console.log('에러 발생');
  // * 에러 발생시 화면에서 처리
  res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
  res.write('<div>데이터베이스 연결 안됨</div>')
  res.end()
  return
  }
}