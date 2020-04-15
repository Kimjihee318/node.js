let static = require('serve-static')
// * body-parser | 요청 파라미터 값을 처리해주는 미들웨어
// *             | post 방식으로 넘기는 값 처리
let path = require('path')

module.exports = function(app) {
  // * STATIC | 특정 폴더의 파일에 특정 패스로 접근 할 수 있도록 열어줌
  // * public에 파일을 넣어두면 클라이언트에서 path로 요청 할 수 있음
  app.use(static(path.join(__dirname, '../public')))

  app.use((req, res, next) => {
    // Chrome Network - Headers - Request Header | User-Agent ... 
    // let userAgent = req.header('User-Agent')
    let userAgent = req.header('User-Agent')
                    // post       || get
    let paramName = req.body.name
    // let paramName = req.body.name || req.query.name
    
    // * 주소창에서       key=value 보내는 법
    // * localhost:3000/?name=jihee
    res.send(`<h4>서버에서 응답 User-Agent: ${userAgent}</h4><br><h4>서버에서 응답 Param-Name: ${paramName}</h4>`)
  })
}