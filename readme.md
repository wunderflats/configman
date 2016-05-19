# configman

[![Travis Build](http://img.shields.io/travis/wunderflats/configman.svg?style=flat)](https://travis-ci.org/wunderflats/configman) [![npm](https://img.shields.io/npm/dm/configman.svg)](https://www.npmjs.com/package/configman)

Tool for defining and checking environment variables in one place.

```sh
npm install @wunderflats/configman
```

## Usage

```js
const envVars = ['PORT', 'HOSTNAME']

const config = require('@wunderflats/configman')
  .ensureAllSet(envVars)

http
  .createServer()
  .listen(config.PORT, config.HOSTNAME)
```

## API

### `require('@wunderflats/configman')`

```js
const configman = require('@wunderflats/configman')
```

Returns an object of type Configman:

```js
type Configman = {
  ensureAllSet(environmentVariables: string[]): Object,
  get(environmentVariable: string): string
}
```

#### `ensureAllSet()`

```js
configman.ensureAllSet(environmentVariables: string[]) : Object
```

Returns an object containing properties for all configured environment
variables.

It also checks if all environment variable are set and throws if not.

```js
let config

process.env.PORT = 1337
process.env.YAWP = undefined

config = configman
  .ensureAllSet(['PORT'])

console.log(config) // { PORT: 1337}


config = configman
  .ensureAllSet(['YAWP']) // throws if `PORT` is not set (part of `process.env`)
```

### `get()`

```js
configman.get(environmentVariable: string): string
```

Returns an object containing properties for all configured environment
variables.

Throws if one of those variables is not set (part of `process.env`) when
accessed.

```js
process.env.PORT = 1337
process.env.YAWP = undefined

const PORT = configman
  .get('PORT')

console.log(PORT) // 1337

const YAWP = configman
  .get('YAWP') // throws if PORT is not set (part of `process.env`)
```
