const expect = require('chai').expect

describe('Arguments parser', () => {
  const rawMessage = require('./helpers/raw-message')

  const argumentsParser = require('./arguments-parser')

  const args = {
    description: {
      required: false,
      keywords: ['description', 'describe']
    },
    title: {
      required: true,
      keywords: ['name', 'title']
    }
  }

  it('matches argument keys with their values', () => {
    let msg = rawMessage('Add a task title "task" and describe it as "todo"')

    let result = argumentsParser(args, msg)

    expect(result.title).to.equal('task')
    expect(result.description).to.equal('todo')
  })

  it('fails if a required argument is missing', () => {
    let msg = rawMessage('Add a task description "A test todo"')

    let missing = argumentsParser(args, msg)

    expect(missing).to.be.false
  })

  it('handles key omiting and zero-param functions', () => {
    let msg = rawMessage('Add a task "A test todo"')

    let omit = Object.keys(argumentsParser(args, msg))[0]

    let zero_param = Object.keys(argumentsParser({}, msg)).length

    expect(omit).to.equal('title')
    expect(zero_param).to.equal(0)
  })
})
