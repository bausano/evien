const expect = require('chai').expect

describe('The Logger component', () => {
  process.env.LOGGER_ENABLED = true

  process.env.LOGGER_LEVEL = 'success'

  it('returns bool on error/success', function () {
    const Logger = require('./logger')

    const _printStub = this.sandbox.stub(Logger, '_print').returns(true)

    let error = Logger.error(),
        success = Logger.success()

    expect(error).to.be.false
    expect(success).to.be.true
  })

  it('stops printing on permission mismash', function () {
    const Logger = require('./logger')

    const _printStub = this.sandbox.stub(Logger, '_print').returns(true)

    let pass = Logger._validate(Logger._types.success, '')

    let fail = Logger._validate(Logger._types.note, '')

    expect(pass).to.be.true
    expect(fail).to.be.false
  })
})
