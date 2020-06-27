import jsdom = require('jsdom')

interface Variable {
  type?: string
  name?: string
}

export interface Method {
  name: string
  params?: Variable[]
  returns?: Variable[]
  description?: string
}

export function parser(apiHTML: string): Method[] {
  const { document } = new jsdom.JSDOM(apiHTML).window

  const luaFunctions = document.getElementsByClassName('l_func')

  const methods: Method[] = []
  for (let i = 0; i < luaFunctions.length; i++) {
    const fEntries = luaFunctions[i].getElementsByTagName('code')
    if (fEntries.length != 1) continue
    const entry = fEntries[0]

    const method = parseFunctionEntry(entry)
    if (method) {
      const description = lookForDescription(luaFunctions[i])
      if (description) method.description = description
      methods.push(method)
    }
  }

  return methods
}

function lookForDescription(node: Element): string {
  let currNode: ChildNode | null = node.nextSibling

  while (currNode) {
    if (currNode.nodeName !== '#text') {
      if (currNode.nodeName == 'A') break
    } else {
      if (currNode.textContent && /\w+/.test(currNode.textContent)) {
        return currNode.textContent.trim()
      }
    }
    currNode = currNode.nextSibling
  }
  return ''
}

function parseFunctionEntry(node: HTMLElement): Method | undefined {
  const nodes: Node[] = []

  for (let i = 0; i < node.childNodes.length; i++) {
    nodes.push(node.childNodes[i])
  }

  if (
    nodes.some(
      (n) => !(n.nodeName === '#text' || n.nodeName === 'I') || typeof n.textContent !== 'string'
    )
  ) {
    return
  }

  const nameI = nodes.findIndex((n) => /reaper\./.test(<string>n.textContent))
  if (nameI < 0) return

  const nameMatches = /reaper\.([^(]+)/.exec(<string>nodes[nameI].textContent)
  if (!nameMatches || !nameMatches[1]) return

  const method: Method = { name: nameMatches[1] }

  const returns = parseVariables(nodes.slice(0, nameI + 1))
  const params = parseVariables(nodes.slice(nameI, nodes.length))

  if (returns.length > 0) method.returns = returns
  if (params.length > 0) method.params = params

  return method
}

function parseVariables(nodes: Node[]): Variable[] {
  const vars: Variable[] = []

  nodes.forEach((n) => {
    const text = n.textContent?.trim()
    if (!text) return

    const textMatches = /\w+/.exec(text)

    if (textMatches && textMatches[0] && n.nodeName === 'I') vars.push({ type: textMatches[0] })
    if (
      textMatches &&
      textMatches[0] &&
      n.nodeName === '#text' &&
      vars[vars.length - 1] &&
      !/reaper\./.test(textMatches[0])
    ) {
      vars[vars.length - 1].name = textMatches[0]
    }
  })

  return vars
}
