const uniqueRandomArray = require('unique-random-array')
const treeNames = require('./tree-names-de.json')

exports.all = treeNames
exports.random = uniqueRandomArray(treeNames)

if (typeof window !== 'undefined') {
  const Clipboard = require('clipboard')

  window.getTreeName = getTreeName

  function getTreeName (e) {
    var textField = document.getElementsByTagName('input')[0]
    textField.value = uniqueRandomArray(treeNames)()
    if (e) textField.select()
  }

  document.addEventListener('DOMContentLoaded', function () {
    new Clipboard('.btn') // eslint-disable-line
    getTreeName()
  }, false)
}
