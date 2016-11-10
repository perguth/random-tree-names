var test = require('tape')
var x = require('./')

test('all the things', t => {
  t.plan(6)
  t.ok(x.all.length > 0, 'Got tree names.')
  t.ok(x.random(), 'Got a random tree name.')
  t.ok(x.random('en'), 'Got a random english tree name.')
  t.notEqual(x.random(), x.random(), 'Got different tree names on consecutive tries.')
  t.equal(x.all('de')[0], 'abendlaendischer-lebensbaum', 'First german tree name matches tree list.')
  t.equal(x.all('en')[0], 'acoma-crapemyrtle', 'First english tree name matches tree list.')
})
