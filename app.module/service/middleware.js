let bodyParser = require('body-parser')

module.exports = class appSerivce {
  constructor(app, express) {
    // public 아래의 파일을 자동으로 링크 연결이 되게 만들기 위해서 사용함
    // 아래의 main.html에 연결된 main.js를 자동으로 연결 해준다.
    // js, css, image등을 static 이라고 함
    app.use(express.static('public'))
    app.use(bodyParser.json())

    // 아스키형태의 데이터로 인코딩 함
    app.use(bodyParser.urlencoded({extended:true}))

    // view engine 지정
    app.set('view engine', 'ejs')
    
    return app
  }
}

