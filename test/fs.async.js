let fs = require('fs')
let path = require('path')

// * Async process | 비동기 | (애이 씽크로 너스)
let getAsyncFiledata = fs.readFile(path.join(__dirname,'../package.json'), 'utf8', (err, data) => {
  console.log('1. async data ', data);
})

console.log('2. after asyncFunction');

fs.writeFile(path.join(__dirname, './output.txt'), 'Hello', (err)=> {
  if(err) {
    console.log(err);
    return
  }

  console.log('finished');
})