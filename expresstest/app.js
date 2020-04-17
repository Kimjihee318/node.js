let express = require('express')
let http = require('http')
let static = require('serve-static')
let path = require('path')

let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let multer = require('multer')
let fs = require('fs')

// * 다중 서버 접속 허용
let cors = require('cors')

let router = express.Router()

// import files
let middleware = require('./middleware/routerless/middleware.app')
let Router = require('./router')
let Cookies = require('./cookieAndSession/cookie')
let Session = require('./cookieAndSession/session')
let Multer = require('./fileUpload/file')


// * express server 객체
let app = express();

// * 포트 속성 설정
app.set('port', process.env.PORT || 3000)

// * STATIC | 특정 폴더의 파일에 특정 패스로 접근 할 수 있도록 열어줌
// * public에 파일을 넣어두면 클라이언트에서 path로 요청 할 수 있음
app.use(static(path.join(__dirname, './public')))
// * upload폴더를 열어줌 오픈되어있어서 조회 가능
app.use('/uploads', static(path.join(__dirname, 'uploads')))

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

// * 다중 서버 접속 허용
app.use(cors())

// * 파일 업로드 미들웨어
new Multer(router)