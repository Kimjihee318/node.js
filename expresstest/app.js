let express = require('express')
let http = require('http')
let static = require('serve-static')
let path = require('path')

let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')

let router = express.Router()

let middleware = require('./middleware/routerless/middleware.app')
let Router = require('./router')
let Cookies = require('./cookieAndSession/cookie')
let Session = require('./cookieAndSession/session')


// * express server 객체
let app = express();

// * 포트 속성 설정
app.set('port', process.env.PORT || 3000)

// * STATIC | 특정 폴더의 파일에 특정 패스로 접근 할 수 있도록 열어줌
// * public에 파일을 넣어두면 클라이언트에서 path로 요청 할 수 있음
app.use(static(path.join(__dirname, './public')))

// * 미들웨어
// * 클라이언트 요청 -> 미들웨어 -> 라우터 -> 응답
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// middleware(app)

// * 쿠키
app.use(cookieParser())
new Cookies(router)

// * 세션
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true,
}))
new Session(router)

// * 라우터
new Router(router)
app.use('/', router)

// * 서버객체 만들기
let server = http.createServer(app).listen(app.get('port'), () => {
  console.log('익스프레스로 웹 서버를 실행함');
})