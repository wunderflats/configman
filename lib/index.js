/* eslint-disable no-process-env */

'use strict'

const debug = require('debug')('config:init')
let enviromentVariables
let currentConfig
let initted = false
let sealed = false

const init = (envVars) => {
  if (sealed && initted) {
    throw Error('`configman.init(…)` was called more than once.')
  } else {
    initted = true
  }

  enviromentVariables = envVars
  currentConfig = {}

  enviromentVariables.forEach((envVar) => {
    debug(`${envVar}=${process.env[envVar]}`)

    Object.defineProperty(currentConfig, envVar, {
      enumerable: true,
      get: function () {
        if (process.env[envVar]) {
          return process.env[envVar]
        } else {
          throw new Error(`ENVIRONMENT VARIABLE ${envVar} IS NOT SET!`)
        }
      },
      set: function (variable) {
        process.env[envVar] = variable
      }
    })
  })

  return module.exports
}

const seal = () => {
  sealed = true
}

const ensureAllSet = () => {
  if (!enviromentVariables || !currentConfig) {
    throw new Error('init() must be called before ensureAllSet()')
  }

  enviromentVariables.forEach((envVar) => currentConfig[envVar])

  return currentConfig
}

const get = () => {
  if (!enviromentVariables || !currentConfig) {
    throw new Error('init() must be called before get()')
  }

  return currentConfig
}

module.exports = exports = {
  init,
  ensureAllSet,
  get: get,
  seal
}
