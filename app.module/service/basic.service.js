var path = require('path');

module.exports = function basicService(app) {
  app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/main.html'))
  // res.send("<h1>hi freind!</h1>")
  })

  // route url/main에서도 똑같이!
  app.get('/main', (req, res) => {
    res.sendFile(path.resolve('public/main.html'))
  })

  // form.html form action 에서 사용하는 url 구성
  app.post('/email_post', (req, res) => {
    console.log(req.body);
    res.render('email.ejs', {'email' : req.body.email})
  })
}
