require('babel-register')({
    presets:  [
        ["env", {
          "targets": {
            "node": "current"
          }
        }]
      ]
})

// module.exports = {
//     default: `--format-options '{"snippetInterface": "asynchronous"}'`
//   }