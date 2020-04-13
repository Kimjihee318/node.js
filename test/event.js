let Calc = require('./calc')

module.exports = function() {
  console.log('event test');

  let calc1 = new Calc()
  calc1.emit('stop')

  console.log('Calc에 stop 이벤트 전달함');
}

// * 이벤트란 
// * 비동기 처리방식으로 처리하기 위해 한 쪽에서 다른 쪽으로 데이터 전달
// * EventEmitter 사용
// * 한쪽에서 이벤트를 emit으로 보내고 다른쪽에서 리스너를 등록하여 on으로 받음

