// const request = require('request')
var http = require('follow-redirects').http
var { writeFileSync } = require('fs')

//sms info
const userName = process.env.SMS_USERNAME
const password = process.env.SMS_PASS

const resType = {
  1000: 'Invalid user or Password',
  1002: 'Empty Number',
  1003: 'Invalid message or empty message',
  1004: 'Invalid number',
  1005: 'All Number is Invalid',
  1006: 'insufficient Balance',
  1009: 'Inactive Account',
  1010: 'Max number limit exceeded',
  1101: 'Success',
}

const sendSMS = async (numbers, message) => {
  let returnMsg = ''
  const newPath = encodeURI(
    `/api.php?username=${userName}&password=${password}&number=${numbers}&message=${message}`
  )

  var options = {
    method: 'POST',
    hostname: '66.45.237.70',
    path: newPath,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxRedirects: 20,
  }

  return new Promise((resolve, reject) => {
    var req = http.request(options, function (res) {
      var chunks = []

      const date = new Date()
      const fullTime = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} ,time-${date.getHours()}:${date.getMinutes()}`

      res.on('data', function (chunk) {
        chunks.push(chunk)
      })

      res.on('end', function (chunk) {
        var body = Buffer.concat(chunks)
        const type = body.toString().split('|')[0]
        returnMsg = `${resType[type]}`

        const isSucceed = type == '1101' ? 'succeed' : 'failed'

        writeFileSync(
          `./logs/${isSucceed}/sentSMS.txt`,
          `{type:"${returnMsg}",numbers:"${numbers}",message:"${message.replace(
            /\n/g,
            ' '
          )}",fullTime:"${fullTime}"},\n`,
          {
            encoding: 'utf8',
            flag: 'a+',
            mode: 0o666,
          }
        )
        resolve({ type: type, msg: returnMsg })
      })

      res.on('error', function (error) {
        returnMsg = 'Error sending sms'

        writeFileSync(
          './logs/failed/sentSMS.txt',
          `{type: "error",numbers:"${numbers}",message:"${message.replace(
            /\n/g,
            ' '
          )}",fullTime:"${fullTime}"},\n`,
          {
            encoding: 'utf8',
            flag: 'a+',
            mode: 0o666,
          }
        )
        resolve(returnMsg)
      })
    })

    req.end()
  })
}

module.exports = sendSMS
