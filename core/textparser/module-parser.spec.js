const expect = require('chai').expect

describe('Module parser', () => {
  const rawMessage = require('./helpers/raw-message')

  const moduleParser = require('./module-parser')

  const mods = {
    todo: {
      keywords: [{word: 'todo', bonus: 3}]
    },
    alarm: {
      keywords: ['alarm', 'remind', 'finchley']
    }
  }

  it('returns a module name with the most keywords matched', () => {
    let msg = rawMessage('Remind me to add alarm to my todolist.')

    let result = moduleParser(mods, msg.cmds)

    expect(result).to.equal('todo')
  })

  it('returns false if no keywords were matched', () => {
    let msg = rawMessage('This is a message')

    let result = moduleParser(mods, msg.cmds)

    expect(result).to.be.false
  })

  it('guesses module based on previous node', () => {
    let msg = rawMessage('Evien, remind me to add alarm todo of finchley.')

    let prev = {module: 'alarm'}

    let result = moduleParser(mods, msg.cmds, prev)

    expect(result).to.equal('alarm')
  })
})
