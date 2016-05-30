/* @flow */
/* eslint-disable no-process-env */

'use strict'

const debug = require('debug')('config:init')

const configman = {
  ensureAllSet (environmentVariables /* : string[] */) {
    environmentVariables.forEach(function (environmentVariable) {
      debug(`${environmentVariable}=${process.env[environmentVariable]}`)
      if (!process.env[environmentVariable]) {
        throw new Error(`Environment variable ${environmentVariable} is not set!`)
      }
    })

    return configman
  },

  get (environmentVariable /* : string */) /* : string */ {
    if (process.env[environmentVariable]) {
      return process.env[environmentVariable]
    } else {
      throw new Error(`Environment variable ${environmentVariable} is not set!`)
    }
  }
}

module.exports = configman
