import fs = require('fs')
import path = require('path')

import { parser } from './parser'

const apiPath = path.resolve(__dirname, '..', 'api', 'reascripthelp.html')
const apiHTML = fs.readFileSync(apiPath, 'utf8')

const apiJSON = parser(apiHTML)
