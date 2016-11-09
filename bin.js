#!/usr/bin/env node

const x = require('./')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

var usage = fs.readFileSync(path.join(__dirname, 'usage.txt'), 'utf8')
var argv = minimist(process.argv.slice(2), {
  boolean: [ 'help', 'all', 'languages' ],
  alias: { help: 'h', all: 'a', languages: 'l' }
})
const lang = argv._[0]

if (argv.help) {
  console.log(usage)
  process.exit()
}

if (argv.languages) {
  console.log(x.languages)
  process.exit()
}

if (argv.all) {
  console.log(x.all(lang))
  process.exit()
}

console.log(x.random(lang))
