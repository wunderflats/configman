/* @flow */
/* eslint-disable no-process-env */

'use strict'

const debug = require('debug')('config:init')

const ensureAllSet = function (environmentVariables /* : string[] */) /* : {[key: string]: string} */ {
  let config = {}

  environmentVariables.forEach(function (environmentVariable) {
    debug(`${environmentVariable}=${process.env[environmentVariable]}`)

    Object.defineProperty(config, environmentVariable, {
      get: function () {
        if (process.env[environmentVariable]) {
          return process.env[environmentVariable]
        } else {
          throw new Error(`Environment variable ${environmentVariable} is not set!`)
        }
      },
      set: function (variable) {
        process.env[environmentVariable] = variable
      }
    })
  })

  environmentVariables.forEach((environmentVariable) => config[environmentVariable])

  return config
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
