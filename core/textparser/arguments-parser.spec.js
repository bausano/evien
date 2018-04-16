const expect = require('chai').expect
const proxyquire =  require('proxyquire')
const rawMessage = require('./helpers/raw-message')

var spy = require('sinon').spy()

const argumentsParser = proxyquire('./arguments-parser', {
  '../stdout': {fails: () => {}},
  '../../modules/collector': {
    module: {
      callback: spy,
      functions: {
        fnc: {
          arguments: {
            description: {
              required: false,
              keywords: ['description', 'describe']
            },
            title: {
              required: true,
              keywords: ['name', 'title']
            }
          }
        },
        nullary: {arguments: {}}
      }
    }
  }
})

describe('Arguments parser', () => {
  it('matches argument keys with their values', () => {
    let message = rawMessage('Add a task title "task" and describe it as "todo"')

    let route = {module: 'module', fnc: 'fnc'}

    let result = argumentsParser(route, message, {})

    expect(result.args.title).to.equal('task')
    expect(result.args.description).to.equal('todo')
  })

  it('fails if a required argument is missing', () => {
    let message = rawMessage('Add a task description "A test todo"')

    let route = {module: 'module', fnc: 'fnc'}

    let missing = argumentsParser(route, message, {})

    expect(missing).to.equal(417)
  })

  it('handles key omiting and zero-param functions', () => {
    let message = rawMessage('Add a task "A test todo"')

    let route = {module: 'module', fnc: 'fnc'}

    let args = argumentsParser(route, message, {}).args

    let omit = Object.keys(args)[0]

    expect(omit).to.equal('title')
  })

  it('returns empty array if function is of zero arguments', () => {
    let message = rawMessage('Add a task "A test todo"')

    let route = {module: 'module', fnc: 'nullary'}

    let args = argumentsParser(route, message, {}).args

    let nullary = Object.keys(args).length

    expect(nullary).to.equal(0)
  })
})
