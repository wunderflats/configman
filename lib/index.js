/* @flow */
/* eslint-disable no-process-env */

'use strict'

const debug = require('debug')('config:init')

const ensureAllSet = function (environmentVariables /* : string[] */) {
  environmentVariables.forEach(function (environmentVariable) {
    debug(`${environmentVariable}=${process.env[environmentVariable]}`)
    if (!process.env[environmentVariable]) {
      throw new Error(`Environment variable ${environmentVariable} is not set!`)
    }
  })

  return exports
}

const get = (environmentVariable /* : string */) /* : string */ => {
  if (process.env[environmentVariable]) {
    return process.env[environmentVariable]
  } else {
    throw new Error(`Environment variable ${environmentVariable} is not set!`)
  }
}

module.exports = exports = {
  ensureAllSet,
  get: get
}
