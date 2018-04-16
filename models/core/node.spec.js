const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const assert = require('assert')

chai.use(require('chai-as-promised'))

describe('Node model', () => {
  require('../index')
  const Node = require('./node')
  const mongoose = require('mongoose')

  var promises = []

  var nodes = []

  it('creates the nodes', () => {
    promises.push(Node.create({source: 'test', module: 'no'}))

    promises.push(Node.create({source: 'test', module: 'no'}))

    promises.push(Node.create({source: 'test', module: 'last'}))

    Promise.all(promises).then((values) => {
      nodes = values
    }).catch((err) => {
      console.log(err)
    })

    return Promise.all([
      expect(promises[0]).to.eventually.have.property('_id'),
      expect(promises[1]).to.eventually.have.property('_id'),
      expect(promises[2]).to.eventually.have.property('_id')
    ])
  })

  it('updates a node', () => {
    let id = nodes[1]._id

    let promise = Node.update(id, {module: 'last'})

    return expect(promise).to.eventually.property('nModified').equal(1)
  })

  it('reads the nodes', () => {
    let ids = []

    for (key in nodes) {
      ids.push(nodes[key]._id)
    }

    var wtf = []

    let promise = Node.get(ids).exec()

    return expect(promise).to.eventually.have.all.keys('0', '1', '2')
  })

  it('gets last node with callback', () => {
    let promise = Node.getLast({
      mins: 1,
      source: 'test'
    }).exec()

    return expect(promise).to.eventually.property('module').equal(nodes[2].module)
  })

  after(() => {
    var rollback = []

    for (key in nodes) {
      let promise = Node.model.remove({_id: nodes[key]._id}, (err) => {
        if (err) {
          throw new Exception('Unable to remove test node with id ' + nodes[key]._id)
        }
      })

      rollback.push(promise)
    }

    return expect(rollback[rollback.length - 1]).to.be.fulfilled
  })
})
