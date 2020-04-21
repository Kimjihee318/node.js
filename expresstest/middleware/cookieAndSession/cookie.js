module.exports = class Cookies {
  constructor(router) {
    router.route('/process/setUserCookie').get((req, res) => {
      console.log('setUserCookie 쿠키 라우팅 함수 호출됨');

      res.cookie('user', {
        id:'jihee',
        name: '김지희',
        authorized: true
      })
      // * res 이 패스에서 응답을 넘겨줌
      res.redirect('/process/showCookie')
    })

    // * 해당 패스에서 웹브라우저에서 저장한 쿠키 정보를 확인하기
    router.route('/process/showCookie').get((req, res) => {
      console.log('showCookie 쿠키 라우팅 함수 호출됨');
      res.send(req.cookies)
    })
  }
}