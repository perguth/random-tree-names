const uniqueRandomArray = require('unique-random-array')

exports.languages = ['de', 'en']
exports.all = getAll
exports.random = getRandom

function getAll (lang) {
  switch (lang) {
    // Using dynamic require paths seems to cause problems.
    case 'de': return require('../tree-names-de.json')
    case 'en': return require('../tree-names-en.json')
  }

  // load and concat all tree names
  var treeNames = []
  exports.languages.forEach(lang => {
    treeNames = treeNames.concat(getAll(lang))
  })
  treeNames = treeNames.sort()
  return treeNames
}

function getRandom (lang) {
  var treeNames = getAll(lang)
  var rand = uniqueRandomArray(treeNames)
  return rand()
}
