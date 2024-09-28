const { existsSync, unlinkSync } = require('fs')
const { resolve } = require('path')

const deleteFile = (path) => {
  const destName = resolve(__dirname, '../', path)
  if (existsSync(destName)) {
    unlinkSync(destName)
  }
}

module.exports = deleteFile
