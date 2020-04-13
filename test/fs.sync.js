let fs = require('fs')
let path = require('path')

// * Sync process | 값이 올때까지 대기하다가 부름
let getSyncFiledata = fs.readFileSync(path.join(__dirname,'../package.json'), 'utf8')

console.log('sync data ', getSyncFiledata)

