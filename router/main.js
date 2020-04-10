let App = require('./config')

// * app.js에서 사용할 때 아래와 같은 방식으로 불러줌
// * app.use('/main', main)
// * ---------------------------------------------
// * app.use()에서 /main을 불러주기 때문에 이곳 라우터에서는 root를 불러준다.
App.router.get('/', (req, res) => {
  console.log('router test /main | /main을 불렀을때 main.html을 반환함');
          // * __dirname은 현재경로를 이야기함
          // * path.join은 array join method와 유사하다.
  res.sendFile(App.path.join(__dirname, '../public/main.html'))
})

module.exports = App.router // * router를 반환함