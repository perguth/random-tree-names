#!/usr/bin/env node

const treeNames = require('../')
const argv = require('yargs').argv
const path = require('path')
const fs = require('fs')

var lang = argv._[0]

if (argv.help) {
  let usage = fs.readFileSync(
    path.join(__dirname, 'usage.txt'),
    'utf8'
  )
  console.log(usage)
  process.exit()
}

if (argv.languages) {
  console.log(treeNames.languages)
  process.exit()
}

if (argv.all) {
  console.log(treeNames.all(lang))
  process.exit()
}

console.log(treeNames.random(lang))
