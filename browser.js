const Clipboard = require('clipboard')
const treeNames = require('./lib')

window.getTreeName = getTreeName
window.setLanguage = setLanguage

var lang = window.localStorage.getItem('language') || ''

function setLanguage (e) {
  lang = e.target.options[e.target.selectedIndex].value
  window.localStorage.setItem('language', lang)
  getTreeName(lang)
}

function getTreeName (e) {
  var textField = document.getElementsByTagName('input')[0]
  textField.value = treeNames.random(lang)
  // if (e) textField.select()
}

document.addEventListener('DOMContentLoaded', function () {
  if (lang) {
    document.querySelector(`select [value=${lang}]`).selected = true
  }
  new Clipboard('.btn') // eslint-disable-line
  getTreeName(lang)
}, false)
