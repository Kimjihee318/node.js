let express = require('express')
let app = express()
let bodyParser = require('body-parser')

// * nodemon app.js를 이용해서 실행시켜주면 계속 변경내용을 추적해서 알려준다.
app.listen(3000, () => {
  console.log("start express server 3000");
})

// * public 아래의 파일을 자동으로 링크 연결이 되게 만들기 위해서 사용함
// * 아래의 main.html에 연결된 main.js를 자동으로 연결 해준다.
// * js, css, image등을 static 이라고 함
app.use(express.static('public'))
app.use(bodyParser.json())
// * 아스키형태의 데이터로 인코딩 함
app.use(bodyParser.urlencoded({extended:true}))

// * view engine은 이것을 쓰겠다.
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/main.html")
  // * res.send("<h1>hi freind!</h1>")
})

// * route url/main에서도 똑같이!
app.get('/main', (req, res) => {
  res.sendFile(__dirname + "/public/main.html")
})

// * form.html form action 에서 사용하는 url 구성
app.post('/email_post', (req, res) => {
  console.log(req.body);
  res.render('email.ejs', {'email' : req.body.email})
})

// * form.html post에서 사용하는 url 구성
app.post('/ajax_send_email', (req, res) => {
  console.log(req.body);
  let responseData = { 'result' : 'ok', 'email' : req.body.email }
  res.json(responseData)
})