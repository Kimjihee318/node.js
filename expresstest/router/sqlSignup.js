let SQL = require('../database/mysql')

module.exports = function Router(router) {
    router.route('/database/sqlsignup').post((req, res) => {
      console.log('라우트 호출')
      let paramId = req.body.id || req.query.id
      let paramName = req.body.name || req.query.name
      let paramPassword =  req.body.password || req.query.password
      let paramAge =  Number(req.body.age || req.query.age)

    // *                                                       추가된 데이터 리턴
    SQL.addUser(paramId, paramName, paramAge, paramPassword, (err, addedUser) => {
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