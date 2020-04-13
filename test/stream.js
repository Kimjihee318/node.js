let fs = require('fs')
let path = require('path')


let infile = fs.createReadStream(path.join(__dirname,'./output.txt'), {flags: 'r'})

infile.on('data', (data)=> {
  console.log(`읽어드린 데이터 : ${data}`);
})

infile.on('end', ()=> {
  console.log(`읽기 종료`);
})