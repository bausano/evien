function print(response)
{
  return new Promise((resolve, reject) => {
    console.group('Response from: ' + response.node.module)
      console.log(new Date())
      console.log(response.text)
    console.groupEnd()

    resolve(true)
  })
}

module.exports = print
