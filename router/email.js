let App = require('./config')
let Mysql = require('../app.module/config/mysql')
let mysqlInstance = new Mysql()
let connection = mysqlInstance.getConnection()

// * form.html form action 에서 사용하는 url 구성
// App.router.post('/form', (req, res) => {
//   console.log(req.body);
//   res.render('email.ejs', {'email' : req.body.email})
// })

// * form.html post에서 사용하는 url 구성
App.router.post('/', (req, res) => {
  let email = req.body.email
  let resposeData = {}
  
  
  connection.query(`'SELECT * FROM user WHERE email=' ${email}';'`, (err, rows) => {
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