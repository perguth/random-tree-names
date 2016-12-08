// I would rather have the contents of `lib/index.js` in here but that does not
// seem to work when using the `browser`-field of the `package.json`:
// the `browser.js` then cannot import the `index.js` properly
module.exports = require('./lib/')
