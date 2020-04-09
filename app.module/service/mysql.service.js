let Mysql = require('../server/mysql')

let mysqlInstance = new Mysql()

module.exports = function mysqlService(app) {
  // * form.html post에서 사용하는 url 구성
  app.post('/ajax_send_email', (req, res) => {
    let email = req.body.email
    let resposeData = {}
    let connection = mysqlInstance.getConnection()

    connection.query(`SELECT * FROM user WHERE email = "${email}"`, (err, rows) => {
      if(err) throw err
      if(rows.length > 0) {
        resposeData.result = `ok`
        resposeData.name = rows[0].name
        res.json(resposeData)
      } else {
        console.log(`none: ${rows[0]}`)
      }
    });
  })
}

// app.post('/ajax_send_email', (req, res) => {
//   console.log(req.body);
//   let responseData = { 'result' : 'ok', 'email' : req.body.email }
//   res.json(responseData)
// })