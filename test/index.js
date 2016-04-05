/* eslint-disable no-process-env */
'use strict'

const test = require('tape')
const config = require('../lib/index')

test('config', (t) => {
  test('`ensureAllSet` throws and exceptions if called before init', (t) => {
    // setup
    t.plan(1)

    // test
    t.throws(config.ensureAllSet, /init\(\) must be called before ensureAllSet\(\)/)
  })

  test('`get` throws and exceptions if called before init', (t) => {
    // setup
    t.plan(1)

    // test
    t.throws(config.get, /init\(\) must be called before get\(\)/)
  })

  test('`init` returns the initial module', (t) => {
    // setup
    t.plan(1)

    // test
    t.equals(config.init([]), config)
  })

  test('defines only the properties it is asked to define', (t) => {
    // setup
    t.plan(2)

    delete process.env.ICEKING
    config.init([
      'PATH',
      'PORT'
    ])

    // test
    t.true(config.get().hasOwnProperty('PORT'), 'PATH defined')
    t.false(config.get().hasOwnProperty('ICEKING'), 'ICEKING is undefined')
  })

  test('throws if a property is not backed by an env var', (t) => {
    // setup
    t.plan(1)

    delete process.env.ICEKING
    config.init(['ICEKING'])

    // test
    t.throws(() => config.get().ICEKING, /ENVIRONMENT VARIABLE ICEKING IS NOT SET!/)
  })

  test('throws if a `ensureAllSet` is called and a property is not backed by an env var', (t) => {
    // setup
    t.plan(1)

    delete process.env.ICEKING
    config.init(['ICEKING'])

    // test
    t.throws(config.ensureAllSet, /ENVIRONMENT VARIABLE ICEKING IS NOT SET!/)
  })

  test('returns the env var corresponding to a property', (t) => {
    // setup
    t.plan(1)

    process.env.FINN = 'jake'
    config.init(['FINN'])

    // test
    t.equal(config.get().FINN, 'jake')

    // tear down
    delete process.env.FINN
  })

  test('does not throw if `ensureAllSet` is called and all properties are backed by an env var', (t) => {
    // set up
    t.plan(1)

    process.env.FINN = 'jake'
    config.init(['FINN'])

    // test
    t.doesNotThrow(config.ensureAllSet)

    // tear down
    delete process.env.FINN
  })

  test('throws if sealed and `init` is called', (t) => {
    // setup
    t.plan(1)

    config
      .init([])
      .seal()

    // test
    t.throws(config.init, /`configman\.init\(…\)` was called more than once\./)
  })

  t.end()
})
