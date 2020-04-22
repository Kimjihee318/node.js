let loginService = require('../service/login.service')

module.exports = function router(router, db) {
  router.route('/database/login').post((req, res) => {
    console.log('/database/login 라우팅 함수 호출됨')

    let paramId = req.body.id || req.query.id
    let paramPassword = parseInt(req.body.password || req.query.password)
    console.log('아이디, 패스워드', paramId, paramPassword, typeof(paramPassword));
    loginService(res, db, paramId, paramPassword)
  })
}