import { Method, Variable } from './types'

/**
 * @description parses code signatures in the format returns[type name,] = namespace.foo([type name,])
 * @example integer retval, string val = reaper.GetProjExtState(ReaProject proj, string extname, string key)
 */
export function parseFunctionEntry(code: string): Method | undefined {
  const exceptions = ['new_array']

  const rgx = /(?:(?<returns>.+)\s)?(?:(?<namespace>[\w{}.]+)\.)?(?<name>\w+)\((?<params>[^)]+)?\)/
  const matches = rgx.exec(code)
  if (matches && matches.groups) {
    if (exceptions.includes(matches.groups.name)) return

    const method: Method = { name: matches.groups.name }

    if (matches.groups.params) {
      method.params = separateMandatoryFromOptional(matches.groups.params, 'params')
    }
    if (matches.groups.returns) method.returns = parseVariables(matches.groups.returns, 'returns')
    if (matches.groups.namespace) method.namespace = matches.groups.namespace.trim()

    return method
  }
}

function separateMandatoryFromOptional(signature: string, type: 'params' | 'returns'): Variable[] {
  const rgx = /(?<mandatory>[^[]+)(?:\[(?<optional>.+)])?/
  const matches = rgx.exec(signature)

  let variables: Variable[] = []

  if (matches && matches.groups) {
    if (matches.groups.mandatory) {
      variables = variables.concat(parseVariables(matches.groups.mandatory, type))
    }
    if (matches.groups.optional) {
      const optionals = parseVariables(matches.groups.optional, type)
      variables = variables.concat(optionals.map((v) => Object.assign(v, { optional: true })))
    }
  }
  return variables
}

function parseVariables(signature: string, type: 'params' | 'returns'): Variable[] {
  const chunks = signature.split(',')
  const rgx = /(\w+)(?:\s+(\w+))?/
  const variables = chunks
    .map((c) => {
      const matches = rgx.exec(c)
      if (matches && matches.length > 1) {
        if (matches[2]) {
          return { type: matches[1], name: matches[2] }
        } else {
          if (type === 'params') return { name: matches[1] }
          if (type === 'returns') return { type: matches[1] }
        }
      }
    })
    .filter((v) => !!v)

  return variables as Variable[]
}
