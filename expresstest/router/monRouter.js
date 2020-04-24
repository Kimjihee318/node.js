let loginService = require('../service/monlogin.service')

module.exports = class router {
  login(router, db) {
    router.route('/database/monlogin').post((req, res) => {
      console.log('/database/monlogin 라우팅 함수 호출됨')
  
      let paramId = req.body.id || req.query.id
      let paramPassword = req.body.password || req.query.password
      console.log('아이디, 패스워드', paramId, paramPassword, typeof(paramPassword));
      loginService(res, db, paramId, paramPassword)
    })
  }
  signin(router, db) {
    router.route('/database/monsignup').post((req, res) => {
      console.log('/database/monsignup 라우팅 함수 호출')
  
      let paramId = req.body.id || req.query.id
      let paramName = req.body.name || req.query.name
      let paramPassword = parseInt(req.body.password || req.query.password)
      console.log('---------------------아이디, 패스워드, 이름 ----------------------', paramId, paramPassword, paramName);
      signupService(res, db, paramId, paramName, paramPassword)
    })
  }
  userlist(router, db, UserModel) {
    router.route('/database/list').post((req, res) => {
      if(db) {
        UserModel.findAll((err,results) => {
          if(err) {
            console.log('에러 발생');
            // * 에러 발생시 화면에서 처리
            res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
            res.write('<div>에러발생</div>')
            res.end()
            return
          }

          if(results) {
            console.dir(results);
            res.writeHead(200, {"Content-Type":"text/html;charset=utf8"})
            res.write(`<div>사용자 리스트</div>`)
            res.write(`<ul>`)

            let resultArr = Array.from({length: resusts.length}, (d, i) => i)
            resultArr.forEach((v) => { res.write(`<li>${v._docs}</li>`)})

            res.write('</ul>')
            res.end()
          }
        })
      }
    })
  }
}