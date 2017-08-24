const callback = require('./index')

const commands = {
  callback: callback,
  keywords: [
    'todo', 'to do', 'i have to', 'i should do', 'list', 'todoist', 'task', 'to-do'
  ],
  functions: {
    add: {
      keywords: [
        {word: 'add', bonus: 3},
        {word: 'save',bonus: 2}
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
    finish: {
      keywords: [
        {word: 'completed', bonus: 2},
        {word: 'finished', bonus: 2},
        {word: 'done', bonus: 2}
      ]
    },
    printAll: {
      keywords: [
        {word: 'all', bonus: 3},
        'tag'
      ]
    },
    count: {
      keywords: [
        {word: 'many', bonus: 2},
        'else', 'any', '?', 'are there'
      ],
      arguments: {}
    },
    random: {
      keywords: [
        'one',
        {word: 'random', bonus: 3}
      ]
    }
  }
}

module.exports = commands
