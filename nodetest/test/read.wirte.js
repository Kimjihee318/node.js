let fs = require('fs')
let path = require('path')

// * fd | file descripter
fs.open(path.join(__dirname, './output.txt'), 'w', (err, fd)=> {
  if(err) {
    console.dir(err);
    return
  }

  let buf = new Buffer('안녕 \n')
  fs.write(fd, buf, 0, buf.length, null, (err, written, buffer)=> {
    if(err) {
      console.dir(err)
      return;
    }
    console.log('write file finished');

    fs.close(fd, ()=> {
      console.log('close');
    })
  })
})