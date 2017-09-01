const expect = require('chai').expect
const proxyquire =  require('proxyquire')
const rawMessage = require('./helpers/raw-message')

const functionParser = proxyquire('./function-parser', {
  './arguments-parser': (route, message, node) => {
    return route.fnc
  },
  '../../modules/collector': {
    module: {
      functions: {
        add: {
          keywords: ['add', 'task']
        },
        remove: {
          keywords: ['remove', 'task']
        }
      }
    }
  }
})

describe('Function parser', () => {
  it('returns a function name with the most keywords matched', () => {
    let message = rawMessage('Please remove a task of "#1".')

    let route = {module: 'module'}

    let result = functionParser(route, message, {})

    expect(result).to.equal('remove')
  })

  it('returns false if no keywords were matched', () => {
    let message = rawMessage('This is a message')

    let route = {module: 'module'}

    let result = functionParser(route, message, {})

    expect(result).to.equal(404)
  })
})
