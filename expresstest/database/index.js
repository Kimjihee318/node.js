let MongoClient = require('mongodb').MongoClient

module.exports = class MongoDB {
  constructor() {
    let databaseUrl = 'mongodb://localhost:27017/local'
    // * 데이터 베이스 연결하기 | connect()
    MongoClient.connect(databaseUrl, (err, db) => {
      if(err) {
        console.log('데이트베이스 연결 에러') 
        return
      }

      console.log('데이터 베이스에 연결됨')
      this.database = db.db('local')
    })
  }
  getDatabase() {
    return this.database
  }
  authUser(db, id, password, callback) {
    console.log('authUser 호출됨')
    // * 컬렉션(테이블) 참조하기 | collection()
    let users = db.collection('users')

    console.log('------------ SELECT *',users.find({}).toArray((err, docs) => {console.log(docs);}));
    // * 문서 찾기 | find()                                    * docs는 DB record
    users.find({"id":id, "password": password}).toArray((err, docs) => {
      if(err) {
        // * callback에서 에러를 처리하게 하면 함수를 호출한 쪽에서 에러 처리.
        // * callback으로 던져준다. parameter는 (err, docs) 순서로 들어가고, 값이 없는 경우 null을 넘겨줌
        callback(err, null)
        return
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

}