const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const assert = require('assert')

chai.use(require('chai-as-promised'))

describe('Response model', () => {
  require('../index')
  const Response = require('./response')
  const mongoose = require('mongoose')

  var promises = []

  var responses = []

  it('creates the response', () => {
    promises.push(
      Response.create({raw: 'This is a response', args: {first: 'First argument'}})
    )

    promises.push(
      Response.create({raw: 'This is another response', args: {first: 'First argument'}})
    )

    Promise.all(promises).then((values) => {
      responses = values
    }).catch((err) => {
      console.log(err)
    })

    return Promise.all([
      expect(promises[0]).to.eventually.have.property('_id'),
      expect(promises[1]).to.eventually.have.property('_id')
    ])
  })

  after(() => {
    var rollback = []

    for (key in responses) {
      let promise = Response.model.remove({_id: responses[key]._id}, (err) => {
        if (err) {
          throw new Exception('Unable to remove test response with id ' + responses[key]._id)
        }
      })

      rollback.push(promise)
    }

    return expect(rollback[rollback.length - 1]).to.be.fulfilled
  })
})
