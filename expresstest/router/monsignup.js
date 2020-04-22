let signupService = require('../service/monsignup.service')

module.exports = function router(router, db) {
  router.route('/database/monsignup').post((req, res) => {
    console.log('/database/monsignup 라우팅 함수 호출')

    let paramId = req.body.id || req.query.id
    let paramName = req.body.name || req.query.name
    let paramPassword = parseInt(req.body.password || req.query.password)
    console.log('---------------------아이디, 패스워드, 이름 ----------------------', paramId, paramPassword, paramName);
    signupService(res, db, paramId, paramName, paramPassword)
  })
}