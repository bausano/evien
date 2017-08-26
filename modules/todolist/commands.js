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
      keywords: [
        {word: 'completed', bonus: 2},
        {word: 'finished', bonus: 2},
        {word: 'done', bonus: 2}
      ],
      arguments: {}
    },
    printAll: {
      keywords: [
        {word: 'all', bonus: 3},
        'tag'
      ],
      arguments: {
        tag: {
          required: false,
          keywords: ['tag', 'label']
        }
      }
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
      ],
      arguments: {}
    },
    remove: {
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
