[![Travis Build](http://img.shields.io/travis/wunderflats/configman.svg?style=flat)](https://travis-ci.org/wunderflats/configman) [![npm](https://img.shields.io/npm/dm/configman.svg)](https://www.npmjs.com/package/configman)

# configman

Tool for defining and checking environment variables in one place.

**DO NOT USE THIS MODULE IN A PACKAGE/MODULE.**  
This is a singleton and will break dependend applications that also use *configman*. (especially with npm@3)


```
npm install @wunderflats/configman
```

## Usage

``` js
const envVars = ['PORT', 'HOSTNAME']

const config = require('@wunderflats/configman')
  .init(envVars)
  .ensureAllSet()

http
  .createServer()
  .listen(config.PORT, config.HOSTNAME)
```

# API

#### require

`configman = require('@wunderflats/configman')`

Returns an object with the methods:

* `init : Array String -> Object`
* `ensureAllSet -> Object`
* `get -> Object`

#### inti

`config.init : Array String -> Object`

Takes an array of strings and returns the initial configman object again, thus can be chained with `get()` or `ensureAllSet`.

The array tells configman what environment variables should be set.

```js
config.init(['PORT'])
```

#### ensureAllSet

`config.ensureAllSet : Object`

Returns an object containing properties for all configured environment variables.

It also checks if all environment variable are set and throws if not.

```js
config = configman
  .init('PORT')
  .ensureAllSet() // throws if `PORT` is not set (part of `process.env`)
```

#### get

`config.get() : Object`

Returns an object containing properties for all configured environment variables.

Throws if one of those variables is not set (part of `process.env`) when accessed.

```js
config = configman
  .init('PORT')
  .get()

config.PORT // throws if PORT is not set (part of `process.env`)
```

## License

Unlicensed.
