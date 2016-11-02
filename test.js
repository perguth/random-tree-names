var test = require('tape')
var x = require('./')

test('all the things', t => {
  t.plan(4)
  t.ok(x.all.length > 0, 'Got tree names.')
  t.ok(x.random(), 'Got a random tree name.')
  t.notEqual(x.random(), x.random(), 'Got different tree names on consecutive tries.')
  t.equal(x.all[0], 'abendlaendischer-lebensbaum', 'First tree name matches tree list.')
})
