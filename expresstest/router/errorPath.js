module.exports = function(app) {
  app.all('*', (req, res)=> {
        // * 응답
    res.status(404).send('<h1>요청한 페이지는 없다</h1>')
  })
}

// 자세한 에러 페이지 처리는 express-error-handler | npm module을 이용해 처리 가능