let multer = require('multer')
let path = require('path')

module.exports = class Multer {
  constructor(router) {
    let storage =  multer.diskStorage({
      destination: (req, file, callback) => { callback(null, 'uploads')},
      filename: (req, file, callback) => {
        // 확장자만 꺼내기
        let extension = path.extname(file.originalname)
                      // 파일 이름만 꺼내기 , extension을 제외
        let basename = path.basename(file.originalname, extension)
        callback(null, basename + Date.now() + extension)
      }
    })

    let upload = multer({
      storage: storage,
      limits: {
        files: 10, // 파일의 개수
        fieldSize: 1024 * 1024 * 1024 // 파일 크기
      }
    })
                                  // photo라는 이름으로 넘어오는 애가 있으면 배열에 넣어주라
    router.route('/process/photo').post(upload.array('photo', 1), (req, res) => {
      console.log('photo 라우팅 호출')

      let files = req.files
      if(files.length > 0) console.dir(files[0])
      else console.log('파일이 없댜 새끼야');

      let fileLengthArr = Array.from({length: files.length}, (d, i) => i)

      console.log(fileLengthArr);
      var originalname, 
          filename, 
          mimetype, 
          size 

      if(Array.isArray(files)) {
        for(let i in fileLengthArr) {
          originalname = files[i].originalname
          filename = files[i].filename
          mimetype = files[i].mimetype
          size = files[i].size
        }
      }

      res.send(`<div>파일 업로드 성공 <br> 원본파일: ${originalname} 저장파일: ${filename}</div>`)
    })

    
  }
}