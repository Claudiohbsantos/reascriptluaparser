import { parseFunctionEntry } from '../src/lib/functionSignatureParser'

describe('code string parser', () => {
  it('type name - reaper. - typed params', () => {
    const multiple = `integer retval, string val = reaper.GetProjExtState(ReaProject proj, string extname, string key)`
    const expected = {
      name: 'GetProjExtState',
      returns: [
        { type: 'integer', name: 'retval' },
        { type: 'string', name: 'val' },
      ],
      params: [
        { type: 'ReaProject', name: 'proj' },
        { type: 'string', name: 'extname' },
        { type: 'string', name: 'key' },
      ],
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('type - reaper. - type name', () => {
    const multiple = `string reaper.GetTakeName(MediaItem_Take take)`
    const expected = {
      name: 'GetTakeName',
      returns: [{ type: 'string' }],
      params: [{ type: 'MediaItem_Take', name: 'take' }],
      namespace: 'reaper',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('reaper. - type name', () => {
    const multiple = `reaper.Help_Set(string helpstring, boolean is_temporary_help)`
    const expected = {
      name: 'Help_Set',
      params: [
        { type: 'string', name: 'helpstring' },
        { type: 'boolean', name: 'is_temporary_help' },
      ],
      namespace: 'reaper',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('reaper.', () => {
    const multiple = `reaper.UpdateArrange()`
    const expected = {
      name: 'UpdateArrange',
      namespace: 'reaper',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('gfx. name', () => {
    const multiple = `gfx.measurechar(char)`
    const expected = {
      name: 'measurechar',
      params: [{ name: 'char' }],
      namespace: 'gfx',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('gfx. name optionals', () => {
    const multiple = `gfx.circle(x,y,r[,fill,antialias])`
    const expected = {
      name: 'circle',
      params: [
        { name: 'x' },
        { name: 'y' },
        { name: 'r' },
        { name: 'fill', optional: true },
        { name: 'antialias', optional: true },
      ],
      namespace: 'gfx',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('double optionals - dont parse', () => {
    const multiple = `reaper.new_array([table|array][size])`

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toBeUndefined()
  })

  it('array function ', () => {
    const multiple = `{reaper.array}.copy([src, srcoffs, size, destoffs])`
    const expected = {
      name: 'copy',
      namespace: '{reaper.array}',
      params: [{ name: 'src' }, { name: 'srcoffs' }, { name: 'size' }, { name: 'destoffs' }],
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })
})
