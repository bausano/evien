function print(response)
{
  return new Promise((resolve, reject) => {
    //let date = (new Date()).toUTCString()
    //date = /, (.*?) GMT/g.exec(date)[1]

    console.log('\x1b[1m\x1b[33mEvien\x1b[0m')
    console.log(response.text)

    resolve(true)
  })
}

module.exports = print
