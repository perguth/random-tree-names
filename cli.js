const x = require('./')
const minimist = require('minimist')

var argv = minimist(process.argv.slice(2), {
  boolean: [ 'all' ],
  alias: { all: 'a' }
})

if (argv.all) {
  console.log(x.all)
} else console.log(x.random())
