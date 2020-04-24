let __C = require('../primitives/_constant_')
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let database, UserSchema, UserModel
module.exports= class Mongoose {
  dbConnection() {
    let databaseUrl = __C.HOST_URL
    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)

    // * 커넥션 객체
    database = mongoose.connection

    // * 커넥션이 된 시점에 할당하기
    // * 연결을 확인하는 이벤트 on
    // * 연결됐을때 발생하는 이벤트
    database.on('open', () => {
      console.log('데이터베이스 연결됨');

      // * record 스키마 정의 ----- ch06-09: 다시듣기
      UserSchema = new Schema({
        id: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        name: {type: String, index: 'hashed'}, // * 검색을 활용하고 싶은 property에 index적용
        age: {type: Number, 'default': -1},
        created_at: {type: Date, index:{unique: false}, 'default': Date.now()},
        updated_at: {type: Date, index:{unique: false}, 'default': Date.now()}
      })

      // * 아래와 같이 스키마를 정의하면, UserModel에서 사용 할 수 있다.
      UserSchema.static('findById', (id, callback) => {
        // * this : 모델 객체를 참조함
        return this.find({id: id}, callback())
      })

      UserSchema.static('findAll', (callback) => {
        return this.find({}, callback())
      })

      // * users 테이블에 UserSchema 연결
      UserModel = mongoose.model('users2', UserSchema)
    })

    database.on('disconnected', () => {
      console.log('데이터 베이스 연결 끊어짐');
    })

    database.on('error', console.error.bind(console, 'mongoose 연결 에러'))

    
  }
  addUser(db, id, password, name, callback) {
    let user = new UserModel({"id": id, "password": password, "name": name })

    user.save(err => {
      if(err) callback(err, null)

      console.log('사용자 데이터 추가함')
      callback(null, user)
    })
  }
  authUser(id, password, callback) {
    UserModel.find({"id":id, "password": password}, (err, docs) => {
      if(err) {
        callback(err, null)
      }

      if(docs.length > 0) {
        console.log('일치하는 사용자를 찾음');
        callback(null, docs)
      } else {
        console.log('일치하는 사용자를 찾지 못함');
        console.log(null, null);
      }
    })
  }
  authUserUsignStatic() {
    UserModel.findById(id, (err, results) => {
      if(err) callback(err, null)
      console.log(`아이디로 검색한 결과`);
      if(results.length > 0) {
        if(results[0]._doc.password === password) {
          console.log('비밀번호 일치함');
          callback(null, results)
        } else {
          console.log('비밀번호 일치하지 않음');
          callback(null, null)
        }
      } else {
      console.log('아이디 일치하는 사용자 없음');
      callback(null, null)
      }
    })
  }
  getItems() {
    return {
      database: database,
      userModel: UserModel
    }
  }
}