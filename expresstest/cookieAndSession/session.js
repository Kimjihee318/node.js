module.exports = class Session {
  constructor(router) {
    router.route('/process/product').get((req, res) => {
      console.log('product 라우팅 함수 호출')

      // 로그인이 되어있지 않으면
      if(!req.session.user) res.redirect('/login2.html')
      res.redirect('/product')
    })

    router.route('/process/login').post((req, res) => {
      console.log('/process/login 라우팅');

      let paramId = req.body.id || req.query.id
      let paramPassword = req.body.password || req.query.password

      if(req.session.user) {
        console.log('이미 로그인 되어있습니다.')
        req.redirect('/product.html')
      } else {
        req.session.user = {
          id: paramId,
          name: '김지희',
          authorized: true,
        }

        res.send(`<div>${paramId}님 로그인 하였습니다.</div><br><a href="/product.html"> 페이지 이동</a>`)
      }
    })

    router.route('/process/logout').get((req, res) => {
      console.log('/process/logout 라우팅 함수 호출됨');

      if(req.session.user) {
        console.log('로그아웃 합니다.');

        req.session.destroy((err) => {
          if(err) { 
            console.log('세션 삭제 에러')
            return
          }

          console.log('세션 삭제 성공')
          res.redirect('/login2.html')
        })
      } else {
        console.log('로그인되어있지 않습니다')
        res.redirect('/login2.html')
      }
    })
  }
}