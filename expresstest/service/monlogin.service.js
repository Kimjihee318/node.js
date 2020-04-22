let Mongoose = require('../database/mongoose')
module.exports = function loginService(res, db, id, password) {
  if(db) {                                    // * callback
    new Mongoose().authUser(id, password, (err, docs) => {
    if(err) {
    console.log('에러 발생');
    // * 에러 발생시 화면에서 처리
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
    res.write('<div>에러발생</div>')
    res.end()
    return
    }

    if(docs) {
      console.dir(docs);
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
      res.write(`<div>로그인 성공 : ${JSON.stringify(docs[0])}</div>`)
      res.end()
    } else {
      // * null값
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
      res.write(`<div>사용자 데이터 조회 안됨</div>`)
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