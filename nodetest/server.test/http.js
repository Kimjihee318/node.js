let http = require('http')
let fs = require('fs')
let path = require('path')

// * 웹서버 객체를 만듦
let server = http.createServer()

// * 호스트
let host = '127.0.0.1'
// * 네트워크 포트
let port = 4000;

// * 클라이언트의 요청을 대기
// | | backlog :동시에 접속할 수 있는 클라이언트 수 | callback
server.listen(port, host, 50000, () => {
  console.log('웹서버가 정상적으로 실행되었을때  port: ', port);
})

// * 클라이언트가 접속 했을때, 내부적으로 소켓이 만들어진다.
server.on('connection', (socket)=> {
  console.log('클라이언트가 접속 했습니다. socket: ', socket);
})

// * 클라이언트에서 요청이 들어 올 때
server.on('request', (req, res) => {
  console.log('클라이언트 요청이 들어 왔습니다. req: ', req, '끝');

  // * HTTP 표준 헤더 전송
  // res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
  // res.write('<h1>김진환  똥 바보 새끼</h1>')
  // res.end() // * 이때 전송함

  // *** 이미지 파일 전송
  let filename = path.join(__dirname,'../asset/image/simpson.jpg')
  fs.readFile(filename, (err, data)=> {
    res.writeHead(200, {"Content-Type": "image/png"})
    res.write(data)
    res.end() // * 이때 전송함
  })
})  