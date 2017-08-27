const expect = require('chai').expect

describe('Function parser', () => {
  const rawMessage = require('./helpers/raw-message')

  const functionParser = require('./function-parser')

  const fncs = {
    add: {
      keywords: ['add', 'task']
    },
    remove: {
      keywords: ['remove', 'task']
    }
  }

  it('returns a function name with the most keywords matched', () => {
    let msg = rawMessage('Please remove a task of "#1".')

    let result = functionParser(fncs, msg.cmds)

    expect(result).to.equal('remove')
  })

  it('returns false if no keywords were matched', () => {
    let msg = rawMessage('This is a message')

    let result = functionParser(fncs, msg.cmds)

    expect(result).to.be.false
  })
})
