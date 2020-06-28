import { parser } from '../src/parser'
import { Method } from '../src/types'

describe('no return and no parameters', () => {
  let received: Method[]
  beforeAll(() => {
    const functionHTML = `<head><title>REAPER API functions</title></head><body><a name="UpdateArrange"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>void UpdateArrange()</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code>UpdateArrange()</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code>reaper.UpdateArrange()</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code>RPR_UpdateArrange()</code><br><br></div>
  Redraw the arrange view<br><br></body>`
    received = parser(functionHTML)
  })

  const expectedMethod = {
    name: 'UpdateArrange',
    description: 'Redraw the arrange view',
  }

  it('UpdateArrange name', () => {
    expect(received[0].name).toBe(expectedMethod.name)
  })

  it('UpdateArrange description', () => {
    expect(received[0].description).toBe(expectedMethod.description)
  })

  it('UpdateArrange params', () => {
    expect(received[0].params).toBeUndefined()
  })

  it('UpdateArrange returns', () => {
    expect(received[0].returns).toBeUndefined()
  })
})

describe('typed return and single param', () => {
  let received: Method[]
  beforeAll(() => {
    const functionHTML = `<head><title>REAPER API functions</title></head><body><a name="GetTakeName"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>const char* GetTakeName(MediaItem_Take* take)</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code>bool  GetTakeName(#retval, <i>MediaItem_Take</i> take)</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code><i>string</i> reaper.GetTakeName(<i>MediaItem_Take</i> take)</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code><i>String</i>  RPR_GetTakeName(<i>MediaItem_Take</i> take)</code><br><br></div>
  returns NULL if the take is not valid<br><br></body>`
    received = parser(functionHTML)
  })

  const expectedMethod = {
    name: 'GetTakeName',
    description: 'returns NULL if the take is not valid',
    returns: [{ type: 'string' }],
    params: [{ type: 'MediaItem_Take', name: 'take' }],
  }

  it('GetTakeName name', () => {
    expect(received[0].name).toBe(expectedMethod.name)
  })

  it('GetTakeName description', () => {
    expect(received[0].description).toBe(expectedMethod.description)
  })

  it('GetTakeName params', () => {
    expect(received[0].params).toMatchObject(expectedMethod.params)
  })

  it('GetTakeName returns', () => {
    expect(received[0].returns).toMatchObject(expectedMethod.returns)
  })
})

describe('multiple returns and multiple params', () => {
  let received: Method[]
  beforeAll(() => {
    const functionHTML = `<head><title>REAPER API functions</title></head><body><a name="TakeFX_FormatParamValueNormalized"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>bool TakeFX_FormatParamValueNormalized(MediaItem_Take* take, int fx, int param, double value, char* buf, int buf_sz)</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code><i>bool </i> TakeFX_FormatParamValueNormalized(<i>MediaItem_Take</i> take, <i>int </i>fx, <i>int </i>param, value, #buf)</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code><i>boolean</i> retval, <i>string </i>buf = reaper.TakeFX_FormatParamValueNormalized(<i>MediaItem_Take</i> take, <i>integer</i> fx, <i>integer</i> param, <i>number</i> value, <i>string </i>buf)</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code>(<i>Boolean</i> retval, <i>MediaItem_Take</i> take, <i>Int</i> fx, <i>Int</i> param, <i>Float</i> value, <i>String</i> buf, <i>Int</i> buf_sz) = RPR_TakeFX_FormatParamValueNormalized(take, fx, param, value, buf, buf_sz)</code><br><br></div>
  Note: only works with FX that support Cockos VST extensions.<br><br></body>`
    received = parser(functionHTML)
  })

  const name = 'TakeFX_FormatParamValueNormalized'
  const description = 'Note: only works with FX that support Cockos VST extensions.'
  const returns = [
    { type: 'boolean', name: 'retval' },
    { type: 'string', name: 'buf' },
  ]
  const params = [
    { type: 'MediaItem_Take', name: 'take' },
    { type: 'integer', name: 'fx' },
    { type: 'integer', name: 'param' },
    { type: 'number', name: 'value' },
    { type: 'string', name: 'buf' },
  ]
  it('FormatParamValueNormalized name', () => {
    expect(received[0].name).toBe(name)
  })

  it('FormatParamValueNormalized description', () => {
    expect(received[0].description).toBe(description)
  })

  it('FormatParamValueNormalized params', () => {
    expect(received[0].params).toMatchObject(params)
  })

  it('FormatParamValueNormalized returns', () => {
    expect(received[0].returns).toMatchObject(returns)
  })
})

describe('description with <br> in the middle', () => {
  const functionHTML = `<head><title>REAPER API functions</title></head><body><a name="GetMediaItemInfo_Value"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>double GetMediaItemInfo_Value(MediaItem* item, const char* parmname)</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code><i>double </i> GetMediaItemInfo_Value(<i>MediaItem</i> item, "parmname")</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code><i>number</i> reaper.GetMediaItemInfo_Value(<i>MediaItem</i> item, <i>string</i> parmname)</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code><i>Float</i>  RPR_GetMediaItemInfo_Value(<i>MediaItem</i> item, <i>String</i> parmname)</code><br><br></div>
  Get media item numerical-value attributes.<br>
  B_MUTE : bool * : muted<br>
  B_LOOPSRC : bool * : loop source<br>
  <br><br>
  <a name="GetMediaItemNumTakes"><hr></a><br></body>`

  const expected = [
    {
      name: 'GetMediaItemInfo_Value',
      returns: [{ type: 'number' }],
      params: [
        { type: 'MediaItem', name: 'item' },
        { type: 'string', name: 'parmname' },
      ],
      namespace: 'reaper',
      description: `Get media item numerical-value attributes.
B_MUTE : bool * : muted
B_LOOPSRC : bool * : loop source`,
    },
  ]

  let received: Method[]
  beforeAll(() => {
    received = parser(functionHTML)
  })

  it('gives entire description back', () => {
    expect(received).toMatchObject(expected)
  })
})

describe('built in functions', () => {
  const functionHTML = `<head><title>REAPER API functions</title></head><div class="l_funcs"><br><br><hr><br><h2>ReaScript/Lua Built-In Function list</h2>
<a name="lua_atexit"><hr></a><br>
Lua: <code>reaper.atexit(function)</code><br><br>
Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.<br><br>
<a name="lua_defer"><hr></a><br>
Lua: <code>reaper.defer(function)</code><br><br>
Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to runloop().
Note that no undo point will be automatically created when the script finishes, unless you create it explicitly.
</div><div class="p_funcs"><br><br><hr><br><h2>ReaScript/Python Built-In Function list</h2>
<a name="python_atexit"><hr></a><br>
Python: <code>RPR_atexit(String)</code><br><br>
Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.<br><br>
</div>`

  const expected = [
    {
      name: 'atexit',
      params: [{ name: 'function' }],
      description:
        'Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.',
    },
    {
      name: 'defer',
      params: [{ name: 'function' }],
      description: `Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to runloop().
Note that no undo point will be automatically created when the script finishes, unless you create it explicitly.`,
    },
  ]

  const received = parser(functionHTML)

  it('descriptions names and params match', () => {
    expect(received).toMatchObject(expected)
  })
})

describe('mock full page', () => {
  const fullHTML = `<html><head><title>
  REAPER API functions
  </title>
  </head><body onLoad='onLoad()'><a name="function_list"></a>
  <br><hr><h3>API Function List</h3>
  <code><table>
  <tr><td><a href="#AddMediaItemToTrack">AddMediaItemToTrack</a> &nbsp; &nbsp; </td>
  <td><a href="#GetEnvelopePoint">GetEnvelopePoint</a> &nbsp; &nbsp; </td></tr>
  </table></code>
  <br><br>
  <a name="AddMediaItemToTrack"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>MediaItem* AddMediaItemToTrack(MediaTrack* tr)</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code><i>MediaItem</i>  AddMediaItemToTrack(<i>MediaTrack</i> tr)</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code><i>MediaItem</i> reaper.AddMediaItemToTrack(<i>MediaTrack</i> tr)</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code><i>MediaItem</i>  RPR_AddMediaItemToTrack(<i>MediaTrack</i> tr)</code><br><br></div>
  creates a new media item.<br><br>
  <a name="Xen_StopSourcePreview"><hr></a><br>
  <div class="c_func"><span class='all_view'>C: </span><code>int Xen_StopSourcePreview(int preview_id)</code><br><br></div>
  <div class="e_func"><span class='all_view'>EEL: </span><code><i>int </i> extension_api("Xen_StopSourcePreview", <i>int </i>preview_id)</code><br><br></div>
  <div class="l_func"><span class='all_view'>Lua: </span><code><i>integer</i> reaper.Xen_StopSourcePreview(<i>integer</i> preview_id)</code><br><br></div>
  <div class="p_func"><span class='all_view'>Python: </span><code><i>Int</i>  Xen_StopSourcePreview(<i>Int</i> preview_id)</code><br><br></div>
  Stop audio preview. id -1 stops all.<br><br>
  <div class="l_funcs"><br><br><hr><br><h2>ReaScript/Lua Built-In Function list</h2>
  <a name="lua_atexit"><hr></a><br>
  Lua: <code>reaper.atexit(function)</code><br><br>
  Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.<br><br>
  <a name="lua_defer"><hr></a><br>
  Lua: <code>reaper.defer(function)</code><br><br>
  Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to runloop().<br>Note that no undo point will be automatically created when the script finishes, unless you create it explicitly.<br><br>
  </div>
  </body></html>
  `

  const expected = [
    {
      name: 'AddMediaItemToTrack',
      namespace: 'reaper',
      params: [{ type: 'MediaTrack', name: 'tr' }],
      returns: [{ type: 'MediaItem' }],
      description: 'creates a new media item.',
    },
    {
      name: 'Xen_StopSourcePreview',
      namespace: 'reaper',
      params: [{ type: 'integer', name: 'preview_id' }],
      returns: [{ type: 'integer' }],
      description: 'Stop audio preview. id -1 stops all.',
    },
    {
      name: 'atexit',
      namespace: 'reaper',
      params: [{ name: 'function' }],
      description:
        'Adds code to be executed when the script finishes or is ended by the user. Typically used to clean up after the user terminates defer() or runloop() code.',
    },
    {
      name: 'defer',
      namespace: 'reaper',
      params: [{ name: 'function' }],
      description:
        'Adds code to be called back by REAPER. Used to create persistent ReaScripts that continue to run and respond to input, while the user does other tasks. Identical to runloop().\nNote that no undo point will be automatically created when the script finishes, unless you create it explicitly.',
    },
  ]

  const received = parser(fullHTML)

  it('All methods match', () => {
    expect(received).toStrictEqual(expected)
  })
})
