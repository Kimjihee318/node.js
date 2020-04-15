EventEmitter = require('events').EventEmitter
let util = require('util')

let Calc = function() {
  this.on('stop', function() {
    console.log('calc에 stop 이벤트 전달됨');
  })
}

// * 상속을 시켜줌
// * 상속 받을 함수, 상속 될 함수
console.log(Calc, EventEmitter);
util.inherits(Calc, EventEmitter)

Calc.prototype.add = (a, b)=> {
  return a + b
}

module.exports = Calc