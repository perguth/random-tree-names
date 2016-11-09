const uniqueRandomArray = require('unique-random-array')

exports.languages = ['de', 'en']
exports.all = getAll
exports.random = getRandom

function getAll (lang) {
  var treeNames = {}
  switch (lang) {
    case 'de': return require('../tree-names-de.json')
    case 'en': return require('../tree-names-en.json')
  }

  treeNames = [
    ...require('../tree-names-de'),
    ...require('../tree-names-en')
  ].sort()
  return treeNames
}

function getRandom (lang) {
  var treeNames = getAll(lang)
  var rand = uniqueRandomArray(treeNames)
  return rand()
}
