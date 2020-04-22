let loginService = require('../service/monlogin.service')

module.exports = function router(router, db) {
  router.route('/database/monlogin').post((req, res) => {
    console.log('/database/monlogin 라우팅 함수 호출됨')

    let paramId = req.body.id || req.query.id
    let paramPassword = req.body.password || req.query.password
    console.log('아이디, 패스워드', paramId, paramPassword, typeof(paramPassword));
    loginService(res, db, paramId, paramPassword)
  })
}