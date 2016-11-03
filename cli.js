const x = require('./')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

var usage = fs.readFileSync(path.join(__dirname, 'usage.txt'), 'utf8')
var argv = minimist(process.argv.slice(2), {
  boolean: [ 'help', 'all' ],
  alias: { help: 'h', all: 'a' }
})

if (argv.help) {
  console.log(usage)
  process.exit()
}

if (argv.all) {
  console.log(x.all)
  process.exit()
}

console.log(x.random())
