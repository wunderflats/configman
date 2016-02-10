'use strict'

require('babel-register')({
  presets: ['es2015-node5'],
  plugins: ['transform-object-rest-spread'],
  sourceMaps: 'both',
  sourceRoot: 'yawp'
})
require('./lib/index')
