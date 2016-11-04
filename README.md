# random-tree-names

> Get random tree names for all your things!

[![Screenshot](https://raw.githubusercontent.com/pguth/random-tree-names/master/docs/161104 screenshot.png)](https://pguth.github.io/random-tree-names/)

## Usage

### Module

```
$ npm install random-tree-names
```

```js
const treeNames = require('random-tree-names')

treeNames.random()
// => 'chenault-schneebeere'
```

### Browser

```js
git clone https://github.com/pguth/random-tree-names.git
cd random-tree-names
npm install
npm start
// => http://localhost:9966
```

## API

### .all

Type: `array`

Tree names in alphabetical order.

### .random()

Type: `function`

Random tree name.


## CLI

```
$ npm install -g random-tree-names
```

```
$ random-tree-name --help

Usage:
  $ random-tree-names

Commands:
  Options:
    -h, --help      Print usage
    -a, --all       Print all tree names

Examples:
  $ random-tree-names                       # prints a random tree name
  $ random-tree-names -a                    # lists all tree names
```

## Tree name sources

- **[German](tree-names-de.json)**: [baumkunde.de](http://www.baumkunde.de/baumlisten/baumliste_az.php)

If you know a good source for any other language please [open an issue](https://github.com/pguth/random-tree-names/issues).

## Related

- [cat-names](https://github.com/sindresorhus/cat-names) - Get popular cat names
- [dog-names](https://github.com/sindresorhus/dog-names) - Get popular dog names
- [pokemon](https://github.com/sindresorhus/pokemon) - Get Pokémon names
- [superb](https://github.com/sindresorhus/superb) - Get superb like words
- [superheroes](https://github.com/sindresorhus/superheroes) - Get superhero names
- [supervillains](https://github.com/sindresorhus/supervillains) - Get supervillain names
- [yes-no-words](https://github.com/sindresorhus/yes-no-words) - Get yes/no like words


## License

MIT
