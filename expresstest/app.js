let express = require('express')
let http = require('http')
let bodyParser = require('body-parser')

let middleware = require('./routerless/middleware.app')

// * express server 객체
let app = express();

// * 포트 속성 설정
app.set('port', process.env.PORT || 3000)

// * 미들웨어
// * 클라이언트 요청 -> 미들웨어 -> 라우터 -> 응답
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

middleware(app)

// * 서버객체 만들기
let server = http.createServer(app).listen(app.get('port'), () => {
  console.log('익스프레스로 웹 서버를 실행함');
})