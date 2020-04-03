let express = require('express')
let app = express()

// * 1. nodemon app.js를 이용해서 실행시켜주면 계속 변경내용을 추적해서 알려준다.
app.listen(3000, () => {
  console.log("start express server 3000");
})