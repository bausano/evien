const expect = require('chai').expect
const proxyquire =  require('proxyquire')
const rawMessage = require('./helpers/raw-message')

const moduleParser = proxyquire('./module-parser', {
  './function-parser': (route, message, node) => {
    return route.module
  },
  '../stdout': {fails: () => {}},
  '../../modules/collector': {
    todo: {
      keywords: [{word: 'todo', bonus: 3}]
    },
    alarm: {
      keywords: ['alarm', 'remind', 'finchley']
    }
  }
})

describe('Module parser', () => {
  it('returns a module name with the most keywords matched', () => {
    let message = rawMessage('Remind me to add alarm to my todolist.')

    let node = {prev: {module: undefined}}

    let result = moduleParser(message, node)

    expect(result).to.equal('todo')
  })

  it('fails if no keywords were matched', () => {
    let message = rawMessage('This is a message')

    let node = {prev: {module: undefined}}

    let result = moduleParser(message, node)

    expect(result).to.equal(404)
  })

  it('guesses module based on previous node', () => {
    let message = rawMessage('Evien, remind me to add alarm todo of finchley.')

    let node = {prev: {module: 'alarm'}}

    let result = moduleParser(message, node)

    expect(result).to.equal('alarm')
  })
})
