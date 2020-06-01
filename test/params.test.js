const qs = require('qs')

const params = {
  name: '123',
  latitude: 123
}
console.log(qs.stringify(params))