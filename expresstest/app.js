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

// imported files
let middleware = require('./middleware/routerless/middleware.app')
let MongoDB = require('./database/mongoDB')
let Mongooose = require('./database/mongoose')
let Cookies = require('./middleware/cookieAndSession/cookie')
let Session = require('./middleware/cookieAndSession/session')
let Multer = require('./middleware/fileUpload/file')
let Module = require('./module')


// imported router files
let Router = require('./router')
let login = require('./router/login')
let monRouter = require('./router/monRouter')
let signup = require('./router/signup')
let monSignup = require('./router/monsignup')
let sqlSignup =  require('./router/sqlSignup')

// database
let db, MongoooseInstance
// * express server 객체
let app = express();

// * 포트 속성 설정
app.set('port', process.env.PORT || 3000)

// * 서버객체 만들기
let server = http.createServer(app).listen(app.get('port'), () => {
  console.log('익스프레스로 웹 서버를 실행함');
  db = new MongoDB()
  MongoooseInstance = new Mongooose()
  MongoooseInstance.dbConnection()
})

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
new Promise((res, rej) => {
  setTimeout(() => {
    res(db.getDatabase())
  }, 2000)})
  .then(res => {
    login(router, res)
    signup(router, res)
  })

setTimeout(() => {
  let Mongoose = MongoooseInstance.getItems()
  let database = Mongoose.database
  let userModel = Mongoose.userModel
  // monlogin(router, database)
  monSignup(router, database)
  // new monRouter().userlist(router, database, userModel)
}, 2000)

sqlSignup(router)
app.use('/', router)

// * 다중 서버 접속 허용
// app.use(cors())

// * 파일 업로드 미들웨어
// new Multer(router)