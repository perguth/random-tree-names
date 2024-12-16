# random-tree-names

> Get random tree names for all your things!

Usable as module, command-line interface and website:

[![Screenshot](docs/161109%20screenshot.png)](https://perguth.github.io/random-tree-names/)

## Usage

### Module

```bash
$ npm install random-tree-names
```

```js
const treeNames = require('random-tree-names')

treeNames.random()
// => 'chenault-schneebeere'
treeNames.random('en')
// => 'flowering-almira-norway-maple'

```

Currently we have tree names in `en` and `de`.

### Browser

```bash
git clone https://github.com/perguth/random-tree-names.git
cd random-tree-names
npm install
npm start
// => http://localhost:9966
```

Or simply click here: https://pguth.github.io/random-tree-names/

### Command-line interface

```bash
$ npm install -g random-tree-names
$ random-tree-names de
feuer-ahorn
```

## API

#### `languages = randomTreeNames.languages`

All available language strings.

#### `allTreeNames = randomTreeNames.all([language])`

Tree names in alphabetical order.

#### `allTreeNames = randomTreeNames.random([language])`

Random tree name.

## CLI

```bash
$ npm install -g random-tree-names
```

```bash
$ random-tree-name --help

Usage:
  $ random-tree-names [language]

Commands:
  <default>    Pick a random name from all languages

  Options:
    -h, --help          Print usage
    -a, --all           Print all tree names
    -l, --languages     Print available language strings

Examples:
  $ random-tree-names                       # prints a random tree name
  $ random-tree-names -a                    # lists all tree names
  $ random-tree-names en -a                 # lists all english tree names
```

## Tree name sources

- **[English](tree-names/tree-names-en.json)**: [hort.ifas.ufl.edu](http://hort.ifas.ufl.edu/database/trees/trees_common.shtml)
- **[German](tree-names/tree-names-de.json)**: [baumkunde.de](http://www.baumkunde.de/baumlisten/baumliste_az.php)

If you know a good source for any other language please [open an issue](https://github.com/pguth/random-tree-names/issues).

## License

MIT
