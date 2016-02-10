const expect = require('chai').expect
const p = require('../package.json')

describe('PACKAGE_NAME', function () {
  it('has a name', function () {
    expect(p).to.have.property('name')
      .that.not.contains('PACKAGE_NAME')
  })
})
