const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const assert = require('assert')

chai.use(require('chai-as-promised'))

describe('Message model', () => {
  require('../index')
  const Message = require('./message')
  const mongoose = require('mongoose')

  var promises = []

  var messages = []

  it('creates the message', () => {
    promises.push(
      Message.create({raw: 'This is a message', args: {first: 'First argument'}})
    )

    promises.push(
      Message.create({raw: 'This is another message', args: {first: 'First argument'}})
    )

    Promise.all(promises).then((values) => {
      messages = values
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

    for (key in messages) {
      let promise = Message.model.remove({_id: messages[key]._id}, (err) => {
        if (err) {
          throw new Exception('Unable to remove test message with id ' + messages[key]._id)
        }
      })

      rollback.push(promise)
    }

    return expect(rollback[rollback.length - 1]).to.be.fulfilled
  })
})
