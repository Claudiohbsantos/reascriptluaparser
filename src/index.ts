import fs = require('fs')
import path = require('path')

import { parser } from './parser'

export default parser

const apiPath = path.resolve(__dirname, '..', 'api', 'reascripthelp.html')
parseHTMLFile(apiPath)

function parseHTMLFile(apiPath: string): void {
  if (!fs.existsSync(apiPath)) throw Error(`${apiPath} doesn't seem to exist`)
  if (path.extname(apiPath).toLowerCase() !== '.html') throw Error(`${apiPath} is not an html file`)

  const apiHTML = fs.readFileSync(apiPath, 'utf8')

  let apiJSON
  try {
    apiJSON = parser(apiHTML)
  } catch (err) {
    console.error(err)
    return
  }

  const outputDir = path.dirname(apiPath)
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)
  fs.writeFileSync(path.resolve(outputDir, 'reaperAPI.json'), JSON.stringify(apiJSON))
}
