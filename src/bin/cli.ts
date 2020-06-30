#!/usr/bin/env node

import { program } from 'commander'
import path from 'path'
import fs from 'fs'

import { parser } from '../lib/parser'
let version = ''
try {
  const pkg = fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
  let pkgJSON
  if (pkg) pkgJSON = JSON.parse(pkg) as Record<string, unknown>
  if (pkgJSON && pkgJSON.version && typeof pkgJSON.version === 'string') version = pkgJSON.version
} catch (err) {
  abort('Failed to read package.json for version information. Try reinstalling from npm')
  throw err
}

program
  .arguments('<reascripthelp.html>')
  .version(version)
  .description(
    "Parse given reascripthelp.html file and generate json file in it's directory. reascripthelp.html can be created from Reaper -> Help -> Reascript Documentation"
  )
  .action((htmlPath) => {
    const filePath = path.resolve(process.cwd(), htmlPath)

    if (!fs.existsSync(filePath)) abort(`${filePath} doesn't seem to exist`)
    if (!fs.lstatSync(filePath).isFile()) {
      abort(
        `${filePath} doesn't seem to be a file. Please point to a Reaper generated reascripthelp.html`
      )
    }
    if (path.extname(filePath).toLowerCase() !== '.html') {
      abort(`${filePath} is not an html file`)
    }

    let apiHTML = ''
    try {
      apiHTML = fs.readFileSync(filePath, 'utf8')
      if (!apiHTML) abort(`${filePath} seems to be empty`)
    } catch (err) {
      abort(`Failed to read ${filePath}`)
    }

    let apiJSON
    try {
      apiJSON = parser(apiHTML)
    } catch (err) {
      if ((err as Error).message) abort((err as Error).message)
    }

    const outputDir = path.dirname(filePath)
    const filename = 'reascript_lua_API.json'
    const outputPath = path.resolve(outputDir, filename)
    try {
      fs.writeFileSync(outputPath, JSON.stringify(apiJSON))
      console.log(`SUCCESS: ${filename} written to ${outputPath}`)
    } catch (err) {
      abort(
        `failed to write ouput to ${outputPath}. Do you have write permission on the directory?`
      )
    }
  })

program.parse(process.argv)

function abort(msg: string): void {
  console.error(`ERROR: ${msg}`)
  console.error(`run with --help option for more information`)
  process.exit(1)
}
