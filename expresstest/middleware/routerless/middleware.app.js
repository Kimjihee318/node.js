// * body-parser | 요청 파라미터 값을 처리해주는 미들웨어
// *             | post 방식으로 넘기는 값 처리

module.exports = function(app) {
  app.use((req, res, next) => {
    // Chrome Network - Headers - Request Header | User-Agent ... 
    // let userAgent = req.header('User-Agent')
    let userAgent = req.header('User-Agent')
                    // post     || get
    let paramName = req.body.id || req.query.id
    
    // * 주소창에서       key=value 보내는 법
    // * localhost:3000/?name=jihee
    res.send(`<h4>서버에서 응답 User-Agent: ${userAgent}</h4><br><h4>서버에서 응답 Param-Name: ${paramName}</h4>`)
  })
}