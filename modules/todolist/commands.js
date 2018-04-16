const callback = require('./index')

const commands = {
  beautify: 'Todolist',
  callback: callback,
  keywords: [
    'todo', 'to do', 'i have to', 'i should do', 'list', 'todoist', 'task', 'to-do'
  ],
  functions: {
    add: {
      beautify: 'add a task',
      keywords: [
        {word: 'add', bonus: 3},
        {word: 'save', bonus: 2}
      ],
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
      }
    },
    detail: {
      beautify: 'give detail about a task',
      keywords: [
        {word: 'detail', bonus: 3},
        'tell', 'about', 'know'
      ],
      arguments: {
        title: {
          required: true,
          keywords: ['title', 'name']
        }
      }
    },
    finish: {
      beautify: 'complete a task',
      keywords: [
        {word: 'completed', bonus: 2},
        {word: 'finished', bonus: 2},
        {word: 'done', bonus: 2}
      ],
      arguments: {}
    },
    printAll: {
      beautify: 'give detail about all tasks',
      keywords: [
        {word: ' all ', bonus: 3}
      ],
      arguments: {
        tag: {
          required: false,
          keywords: ['tag', 'label']
        }
      }
    },
    count: {
      beautify: 'count all tasks',
      keywords: [
        {word: 'many', bonus: 2},
        ' else ', ' any ', '?', 'are there'
      ],
      arguments: {}
    },
    random: {
      beautify: 'pick a random task',
      keywords: [
        ' one ',
        {word: 'random', bonus: 3}
      ],
      arguments: {}
    },
    remove: {
      beautify: 'remove a task',
      keywords: [
        {word: 'remove', bonus: 2},
        {word: 'delete', bonus: 2},
        ['forget']
      ],
      arguments: {},
      approval: true
    }
  }
}

module.exports = commands
