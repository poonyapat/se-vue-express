// require('babel-register')({
//     presets:  [
//         ["env", {
//           "targets": {
//             "node": "current"
//           }
//         }]
//       ]
// })
const sayHello = _ => "Hello guys!"
console.log(sayHello())
exports.default = sayHello