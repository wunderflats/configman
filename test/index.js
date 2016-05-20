/* @flow */
/* eslint-disable no-process-env */
'use strict'

const test = require('tap').test
const configman = require('../lib/index')

test('config', (t) => {
  test('`ensureAllSet` returns configman', (t) => {
    // setup
    t.plan(1)

    process.env.PORT = '1337'

    const config = configman.ensureAllSet(['PORT'])

    // test
    t.deepEqual(config, configman)

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
