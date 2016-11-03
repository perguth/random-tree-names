const Clipboard = require('clipboard')
const x = require('./lib')

window.getTreeName = getTreeName

function getTreeName (e) {
  var textField = document.getElementsByTagName('input')[0]
  textField.value = x.random()
  if (e) textField.select()
}

document.addEventListener('DOMContentLoaded', function () {
  new Clipboard('.btn') // eslint-disable-line
  getTreeName()
}, false)
