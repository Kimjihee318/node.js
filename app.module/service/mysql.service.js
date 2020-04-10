let Mysql = require('../server/mysql')

let mysqlInstance = new Mysql()

module.exports = function mysqlService(app) {
  // * form.html post에서 사용하는 url 구성
  app.post('/ajax_send_email', (req, res) => {
    let email = req.body.email
    let resposeData = {}
    let connection = mysqlInstance.getConnection()

    connection.query(`SELECT * FROM user WHERE email = "${email}"`, (err, rows) => {
      // TODO throw 와 console.log 비교
      if(err) throw err
      
      if(rows.length > 0) {
        resposeData.result = `ok`
        resposeData.name = rows[0].name
      } else {
        resposeData.result = `none`
        resposeData.name = ''
      }
      
      // * 서버의 응답
      res.json(resposeData)
    });
  })
}

// app.post('/ajax_send_email', (req, res) => {
//   console.log(req.body);
//   let responseData = { 'result' : 'ok', 'email' : req.body.email }
//   res.json(responseData)
// })