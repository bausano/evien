const Todolist = require('./index')

const commands = {
  keywords: [
    'todo', 'to do', 'i have to', 'i should do', 'list', 'todoist', 'task', 'to-do'
  ],
  functions: {
    add: {
      keywords: ['add', 'task', 'save'],
      arguments: {
        title: {
          required: true,
          keywords: ['name', 'title']
        },
        description: {
          required: false,
          keywords: ['description', 'describe']
        },
        tag: {
          required: false,
          keywords: ['tag', 'label']
        }
      },
      cb: Todolist.add
    },
    finish: {
      keywords: ['completed', 'finished', 'done']
    },
    printAll: {
      keywords: ['all', 'tag', 'tagged']
    },
    count: {
      keywords: ['many', 'how many', 'else', 'any']
    },
    random: {
      keywords: ['one', 'random']
    }
  }
}

module.exports = commands
