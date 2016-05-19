/* @flow */
/* eslint-disable no-process-env */
'use strict'

const test = require('tap').test
const configman = require('../lib/index')

test('config', (t) => {
  test('defines only the properties it is asked to define', (t) => {
    // setup
    t.plan(2)

    process.env.PORT = '1337'
    delete process.env.ICEKING

    const config = configman
      .ensureAllSet(['PORT'])

    // test
    t.true(config.hasOwnProperty('PORT'), 'PATH defined')
    t.false(config.hasOwnProperty('ICEKING'), 'ICEKING is undefined')

    // tear down
    delete process.env.PORT
  })

  test('throws if a property is not backed by an env var', (t) => {
    // setup
    t.plan(1)

    delete process.env.ICEKING

    // test
    t.throws(() => configman.get('ICEKING'), /environment variable iceking is not set!/i)
  })

  test('throws if a `ensureAllSet` is called and a property is not backed by an env var', (t) => {
    // setup
    t.plan(1)

    delete process.env.ICEKING

    // test
    t.throws(() => configman.ensureAllSet(['ICEKING']), /environment variable iceking is not set!/i)
  })

  test('returns the env var corresponding to a property', (t) => {
    // setup
    t.plan(1)

    process.env.FINN = 'jake'

    // test
    t.equal(configman.get('FINN'), 'jake')

    // tear down
    delete process.env.FINN
  })

  test('does not throw if `ensureAllSet` is called and all properties are backed by an env var', (t) => {
    // set up
    t.plan(1)

    process.env.FINN = 'jake'

    // test
    t.doesNotThrow(() => configman.ensureAllSet(['FINN']))

    // tear down
    delete process.env.FINN
  })

  t.end()
})
