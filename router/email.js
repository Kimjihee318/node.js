let App = require('./config')
let Mysql = require('../app.module/database/mysql')
let mysqlInstance = new Mysql()
let connection = mysqlInstance.getConnection()

// * form.html form action 에서 사용하는 url 구성
// App.router.post('/form', (req, res) => {
//   console.log(req.body);
//   res.render('email.ejs', {'email' : req.body.email})
// })
App.router.post('/', (req, res) => {
  console.log('get email');
  res.sendFile(App.path.join(__dirname, '../public/form.html'))
})
// * form.html post에서 사용하는 url 구성
App.router.post('/', (req, res) => {
  let email = req.body.email
  let resposeData = {}
  
  // * 변수를 string으로 처리해주지 않아서 오류 
  // ** SQL 오류라고 하는데 이상한 생각함 그냥 오류라고 하면 그것만 봐라
  connection.query(`SELECT * FROM user WHERE email = "${email}"`, (err, rows) => {
  // TODO throw 와 console.log 비교
    if(err) { console.log(err);}
    if(rows.length > 0) {
      resposeData.result = `ok`
      resposeData.name = rows[0].name
    } else {
      resposeData.result = `none`
      resposeData.name = ''
    }
    
    // * 서버의 응답
    res.json(resposeData)
  });
})

module.exports = App.router