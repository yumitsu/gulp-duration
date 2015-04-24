var pretty = require('pretty-hrtime')
var through = require('through2')
var chalk = require('chalk')

module.exports = duration

var prefix = '[' + chalk.green('gulp') + '] '

function duration(name, prefix$) {
  var start  = process.hrtime()
  var stream = through.obj({
    objectMode: true
  })

  prefix$ = ('[' + chalk.gray(prefix$) + ']') || prefix;

  stream.start = resetStart

  name = name || 'gulp-duration'
  name = '' + name + ': '

  return stream.once('end', function() {
    var time = pretty(process.hrtime(start))

    log(name + chalk.magenta(time))
  })

  function resetStart() {
    start = process.hrtime()
  }

  function log(str) {
    str = prefix$ + str
    console.log(str)
  }
}
