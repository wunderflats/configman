# configman

[![Travis Build](http://img.shields.io/travis/wunderflats/configman.svg?style=flat)](https://travis-ci.org/wunderflats/configman) [![npm](https://img.shields.io/npm/dm/@wunderflats/configman.svg)](https://www.npmjs.com/package/@wunderflats/configman)

Tool for defining and checking environment variables in one place.

```sh
npm install @wunderflats/configman
```

## Usage

```js
const envVars = ['PORT', 'HOSTNAME']

const configman = require('@wunderflats/configman')
  .ensureAllSet(envVars)

http
  .createServer()
  .listen(configman.get('PORT'), configman.get('HOSTNAME'))
```

## API

### `require('@wunderflats/configman')`

```js
const configman = require('@wunderflats/configman')
```

Returns an object of type Configman:

```js
type Configman = {
  ensureAllSet(environmentVariables: string[]): Configman,
  get(environmentVariable: string): string
}
```

#### `ensureAllSet()`

```js
configman.ensureAllSet(environmentVariables: string[]) : Configman
```

Checks if all environment variable are set and throws if not. Returns configman.

```js
process.env.PORT = 1337
process.env.YAWP = undefined

configman.ensureAllSet(['PORT'])

console.log(configman.get('PORT')) // { PORT: 1337}

config = configman
  .ensureAllSet(['YAWP']) // throws since `YAWP` is not set (part of `process.env`)
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
  .get('YAWP') // throws since `YAWP` is not set (part of `process.env`)
```
