module.exports = function(router) {
  // * 요청 패스로 들어 올 때 처리 | 반면 미들웨어는 모든 요청 처리함
  //                           * 포스트 방식으로 처리 하겠다.(클라이언트가 post로 보내는것을 전제)
  router.route('/process/login').post((req, res) => {
    console.log('/process/login 라우팅 함수에서 받음')
    // * 요청값을 읽고
    let paramId = req.body.id || req.qurey.id
    let paramPassword = req.body.password || req.query.password
    // * 응답 보내기
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8"})
    res.write(`<div>${paramId} & ${paramPassword}</div>`)
  })
}