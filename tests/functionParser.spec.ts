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

    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('reaper.', () => {
    const multiple = `reaper.UpdateArrange()`
    const expected = {
      name: 'UpdateArrange',
      namespace: 'reaper',
    }

    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('gfx. name', () => {
    const multiple = `gfx.measurechar(char)`
    const expected = {
      name: 'measurechar',
      params: [{ name: 'char' }],
      namespace: 'gfx',
    }

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

    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('double optionals - dont parse', () => {
    const multiple = `reaper.new_array([table|array][size])`

    expect(parseFunctionEntry(multiple)).toBeUndefined()
  })

  it('array function ', () => {
    const multiple = `{reaper.array}.copy([src, srcoffs, size, destoffs])`
    const expected = {
      name: 'copy',
      namespace: '{reaper.array}',
      params: [{ name: 'src' }, { name: 'srcoffs' }, { name: 'size' }, { name: 'destoffs' }],
    }
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })

  it('literal optional marker', () => {
    const multiple = `boolean retval, optional boolean selected, optional boolean muted, optional number ppqpos, optional number type, optional string msg = reaper.MIDI_GetTextSysexEvt(MediaItem_Take take, integer textsyxevtidx, optional boolean selected, optional boolean muted, optional number ppqpos, optional number type, optional string msg)`
    const expected = {
      name: 'MIDI_GetTextSysexEvt',
      returns: [
        { type: 'boolean', name: 'retval' },
        { type: 'boolean', name: 'selected', optional: true },
        { type: 'boolean', name: 'muted', optional: true },
        { type: 'number', name: 'ppqpos', optional: true },
        { type: 'number', name: 'type', optional: true },
        { type: 'string', name: 'msg', optional: true },
      ],
      params: [
        { type: 'MediaItem_Take', name: 'take' },
        { type: 'integer', name: 'textsyxevtidx' },
        { type: 'boolean', name: 'selected', optional: true },
        { type: 'boolean', name: 'muted', optional: true },
        { type: 'number', name: 'ppqpos', optional: true },
        { type: 'number', name: 'type', optional: true },
        { type: 'string', name: 'msg', optional: true },
      ],
    }
    expect(parseFunctionEntry(multiple)).toMatchObject(expected)
  })
})
