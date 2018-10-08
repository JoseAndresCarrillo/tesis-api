const fse = require('fs-extra')
const path = require('path')

// This is the root folder where will be placed all the files
// It is relative to the folder of the main process
const ROOT = 'storage/'

module.exports = {
  readFile,
  writeFile,
  saveFile,
  deleteFile,
  decodeBase64File
}

async function readFile (targetPath) {
  const target = path.join(ROOT, targetPath)
  return fse.readFile(target)
}

async function writeFile (targetPath, buffer) {
  const target = path.join(ROOT, targetPath)
  return fse.writeFile(target)
}

async function saveFile (target, name, base64) {
  // Validate path (never ends with "/". It can be: "", "/hi", "/my/path")
  const pathReg = /^(\/[a-z-\d]+)*$/
  if (!pathReg.test(target)) throw new Error('Invalid target folder')

  // Validate name (i.e.: "my-file-name")
  const slugReg = /^[a-z-\d]+$/
  if (!slugReg.test(name)) throw new Error('Invalid name')

  // Decode base64
  const { mime, buffer } = decodeBase64File(base64)

  // Ensure if directory exists
  const dir = path.join(ROOT, target)
  await fse.ensureDir(dir)

  // Set final target
  const fullname = name + '.' + mime.split('/')[1]
  const targetPath = dir + '/' + fullname // i.e: storage/sierra/cusco/home.jpg

  // Finally write the file
  await fse.writeFile(targetPath, buffer)
  return target + '/' + fullname
}

async function deleteFile (targetPath) {
  console.log(targetPath)
  const target = path.join(ROOT, targetPath)
  console.log(target)
  await fse.remove(target)
}

// Utils
function decodeBase64File (dataString) {
  const base64Reg = /^data:([A-Za-z-+/]+);base64,(.+)$/
  if (!base64Reg.test(dataString)) throw new Error('Invalid base64')
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
  if (matches.length !== 3) throw new Error('Invalid base64')
  return {
    mime: matches[1],
    buffer: Buffer.from(matches[2], 'base64')
  }
}
