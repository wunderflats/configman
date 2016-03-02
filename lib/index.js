/* eslint-disable no-process-env */

'use strict'

const debug = require('debug')('config:init')
let enviromentVariables
let currentConfig

const init = (envVars) => {
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
  get: get
}
