let App = require('./config')

// * form.html form action 에서 사용하는 url 구성
App.router.post('/form', (req, res) => {
  console.log(req.body);
  res.render('email.ejs', {'email' : req.body.email})
})

// * form.html post에서 사용하는 url 구성
App.router.post('/ajax', (req, res) => {
  console.log(req.body);
  let responseData = { 'result' : 'ok', 'email' : req.body.email }
  res.json(responseData)
})

module.exports = App.router