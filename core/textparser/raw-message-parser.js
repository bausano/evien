function msgSplit (raw)
{
  let split = raw.split('"')

  let cmds = [],
      args = []

  for (let i = 0; i < split.length; i++) {
    if(i % 2 === 0) {
      cmds.push(split[i])
    } else {
      args.push(split[i])
    }
  }

  return {
    cmds: cmds,
    args: args
  }
}

module.exports = {get: msgSplit}
