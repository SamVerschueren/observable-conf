# observable-conf [![Build Status](https://travis-ci.org/SamVerschueren/observable-conf.svg?branch=master)](https://travis-ci.org/SamVerschueren/observable-conf)

> Listen for changes in your [conf](https://github.com/sindresorhus/conf) config


## Install

```
$ npm install observable-conf
```


## Usage

```js
const Conf = require('observable-conf');
const config = new Conf();

config.select('unicorn').subscribe(value => {
	console.log(value);
	//=> '🦄'
})

config.set('unicorn', '🦄');
```


## API

### Conf([options])

Returns a new instance.

#### options

Any of the [conf options](https://github.com/sindresorhus/conf#options).

### Instance

An extended [conf](https://github.com/sindresorhus/conf#instance) instance.

#### select(key)

Returns an [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html).

##### key

Type: `string`

Key in the config to observe for changes.


## Related

- [conf](https://github.com/sindresorhus/conf) - Simple config handling for your app or module
- [cache-conf](https://github.com/SamVerschueren/cache-conf) - Simple cache config handling for your app or module


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
