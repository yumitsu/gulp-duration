var pretty = require('pretty-hrtime')
var through = require('through2')
var chalk = require('chalk')

module.exports = duration

var prefix = '[' + chalk.green('gulp') + '] '

function duration(name, options) {
  var start  = process.hrtime()
  var stream = through.obj({
    objectMode: true
  })

  options        = options || {};
  options.color  = (options.color != null) ? (chalk[options.color] || chalk.green) : chalk.green;
  options.prefix = (options.prefix != null) ? '[' + options.color(options.prefix) + '] ' : prefix;

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
    str = options.prefix + str
    console.log(str)
  }
}
