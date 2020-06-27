import jsdom = require('jsdom')

import { Method } from './types'
import { parseFunctionEntry } from './functionSignatureParser'

export function parser(apiHTML: string): Method[] {
  const { document } = new jsdom.JSDOM(apiHTML).window

  const mainMethods = parseLuaFunctions(document.getElementsByClassName('l_func'))
  const builtIn = parseLuaFunctions(document.getElementsByClassName('l_funcs'))
  return mainMethods.concat(builtIn)
}

function parseLuaFunctions(luaFunctions: HTMLCollection): Method[] {
  const methods: Method[] = []
  for (let i = 0; i < luaFunctions.length; i++) {
    const codes = luaFunctions[i].getElementsByTagName('code')
    for (let j = 0; j < codes.length; j++) {
      if (!codes[j] || !codes[j].textContent) continue
      const m = parseFunctionEntry(<string>codes[j].textContent)
      if (m) {
        // determines whether it's parsing built in functions or main api in order to look for description in right branch
        const siblingOfDescription = codes.length > 1 ? codes[j] : luaFunctions[i]
        const description = lookForDescription(siblingOfDescription)
        if (description) m.description = description
        methods.push(m)
      }
    }
  }

  return methods
}

function lookForDescription(node: Element): string {
  let currNode: ChildNode | null = node.nextSibling

  let description = ''
  while (currNode) {
    if (currNode.nodeName !== '#text') {
      if (currNode.nodeName == 'A') break
    } else {
      if (currNode.textContent && /\w+/.test(currNode.textContent)) {
        description = description + currNode.textContent.trim() + '\n'
      }
    }
    currNode = currNode.nextSibling
  }
  return description.trim()
}
