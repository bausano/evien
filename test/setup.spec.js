const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')

process.env.PORT = 3000

before(() => {
  chai.use(sinonChai)
})

beforeEach(function beforeEach () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function afterEach () {
  this.sandbox.restore()
})
