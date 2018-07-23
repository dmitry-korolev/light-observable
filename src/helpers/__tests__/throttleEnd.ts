import { throttleEnd } from '../throttleEnd'

describe('(Util) throttle', () => {
  it('should call function at most once after "wait" ms at "wait" ms period', () => {
    let context
    const f = jest.fn(function(this: any) {
      context = this
    })
    const throttled = throttleEnd(1000, f)

    throttled.call({ a: 1 }, 1, 2)
    throttled.call({ a: 2 }, 3, 4)
    throttled.call({ a: 3 }, 5, 6)
    expect(f.mock.calls).toHaveLength(0)
    jest.runAllTimers()
    expect(f.mock.calls).toHaveLength(1)
    expect(f).toBeCalledWith(5, 6)
    expect(context).toEqual({ a: 1 })

    throttled.call({ a: 4 }, 7)
    expect(f.mock.calls).toHaveLength(1)
    jest.runAllTimers()
    expect(f.mock.calls).toHaveLength(2)
    expect(f).toBeCalledWith(7)
    expect(context).toEqual({ a: 4 })
  })
})
