let app = require('../config')
let Mysql = require('../../app.module/database/mysql')

let mysqlInstance = new Mysql()

// * 순서 (req, res)
app.router.get('/', (req, res) => {
  console.log('get join url');
  // res.sendFile(app.path.join(__dirname, '../../public/join.html'))
  res.render('join.ejs')
})

app.router.post('/', (req, res) => {
  let body = req.body
  // TODO destructure
  // let id = body.id
  let email = body.email
  let name = body.name
  let passwd = body.passwd

  // * s
  let sql = {no: null, email: email, name: name, pw: passwd}

  // no.1 | NOT USING ESCAPE | let query = mysqlInstance.getConnection().query(`INSERT INTO user (id,email,name,pw) VALUES ("${id}","${email}","${name}","${passwd}")`, (err, rows) => {
  // 변수마다 쌍 따옴표로 감싸야 MYSQL에서 문자로 인식한다.
  // https://m.blog.naver.com/PostView.nhn?blogId=eyeballss&logNo=220707298708&proxyReferer=https:%2F%2Fwww.google.com%2F
  // * MYSQL ESCAPE를 사용하여 쿼리 정리 | injection 공격에 효과적임
  // * https://github.com/mysqljs/mysql | escaping queries documentation
  let query = mysqlInstance.getConnection().query(`INSERT INTO user set ?`, sql , (err, rows) => {
    if(err) {
      console.log(err);
      throw err
      // TODO
      return
    }
    res.render('join_res.ejs', {'no' : rows.insertId, 'name': name})
  })
})
module.exports = app.router