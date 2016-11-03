const uniqueRandomArray = require('unique-random-array')
const treeNames = require('../tree-names-de.json')

exports.all = treeNames
exports.random = uniqueRandomArray(treeNames)
