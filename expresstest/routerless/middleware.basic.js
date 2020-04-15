// * 미들웨어
// * 중간에서 요청을 가로채 처리함
// * app.use()로 설정
module.exports = function(app) {
  // * path를 사용하지 않는 미들웨어는 아래와 같이 콜백함수 하나만 씀
  app.use(function(req, res, next) {
    console.log('첫번째 미들웨어');
    
    // * req 객체에 자유롭게 property 추가 가능
    req.user = 'Jihee'

    // * 다음 라우터로 return
    next()
  })

  // * 이전 미들웨어의 req 받아옴
  // app.use(function(req, res, next) {
  //   console.log('두번째 미들웨어');
  //   // req는 위의 req객체가 넘어온것
  //   res.writeHeader(200, {"Content-Type":"text/html;charset=utf-8"})
  //   res.write(`<h1>${ req.user }</h1>`)
  //   res.end()
  // })

  // * JSON처리
  // app.use(function(req, res, next) {  
  //   console.log('세번째 미들웨어');
  //   // req는 위의 req객체가 넘어온것 
  //   // * writeHeader write end를 한꺼번에 처리하는것

  //   // res.send()를 이용하여 보내기 | writeHead, write 모두 합한것
  //   // JSON으로 보내기
  //   let person = {name: 'Jihee', age: 32, rich: true}

  //   // JSON 문자로 보내기 | 스트린지fㅏ이
  //   let personStr = JSON.stringify(person)
  //   // res.send(personStr)

  //   // Write를 이용
  //   res.writeHead('200', {"content-Type": "application/json;charset=utf-8"})
  //   res.write(personStr)
  //   res.end()
  // })

  // * redirect
  // app.use(function(req, res, next) {
  //   res.redirect('https://google.co.kr')
  // })

  // * 헤더 정보와 요청 파라메터 정보 가져오기
  app.use(function(req, res, next) {
    // Chrome Network - Headers - Request Header | User-Agent ... 
    // let userAgent = req.header('User-Agent')
    let userAgent = req.header('User-Agent')
    let paramName = req.query.name
    
    // * 주소창에서       key=value 보내는 법
    // * localhost:3000/?name=jihee
    res.send(`<h4>서버에서 응답 User-Agent: ${userAgent}</h4><br><h4>서버에서 응답 Param-Name: ${paramName}</h4>`)
  })
}