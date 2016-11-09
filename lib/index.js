const uniqueRandomArray = require('unique-random-array')

exports.languages = ['de', 'en']
exports.all = getAll
exports.random = getRandom

function getAll (lang) {
  var treeNames = []
  var languages = exports.languages

  if (languages.indexOf(lang) !== -1) {
    return require(`../tree-names-${lang}.json`)
  }
  languages.forEach(lang => {
    Array.prototype.push.apply(treeNames, require(`../tree-names-${lang}.json`))
  })
  return treeNames
}

function getRandom (lang) {
  var treeNames = getAll(lang)
  var rand = uniqueRandomArray(treeNames)
  return rand()
}
