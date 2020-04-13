let output = '안녀엉'
// * Buffer 문자열이나 데이터를 바이트 단위로 다루는 것
let buffer = new Buffer(10)
let lenBuffer = buffer.write(output, 'utf8')
console.log(`버퍼에 쓰인 문자열의 길이: ${lenBuffer} | 첫번째 버퍼에 쓰인 문자열: ${buffer.toString()}`);

let byteLen = Buffer.byteLength(buffer)
console.log(`버퍼 byte length ${byteLen}`);

let str1 = buffer.toString('utf8', 0, 10)
console.log(`버퍼 스트링 ${str1}`);