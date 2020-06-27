import { parser, Method } from '../src/parser'

describe('no return and no parameters', () => {
  let received: Method[]
  beforeAll(() => {
    const functionHTML = `<body><a name="UpdateArrange"><hr></a><br>
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
    const functionHTML = `<body><a name="GetTakeName"><hr></a><br>
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
    const functionHTML = `<body><a name="TakeFX_FormatParamValueNormalized"><hr></a><br>
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

// describe('description with <br> in the middle')

// describe('built in functions')
