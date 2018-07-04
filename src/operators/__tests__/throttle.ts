import { createSubject } from '../../observable/subject'
import { throttle } from '../throttle'

jest.useFakeTimers()

describe('(Operator) throttle', () => {
  it('throttles function', () => {
    const [stream, sink] = createSubject()
    const throttledStream = throttle(1000)(stream)
    const fn = jest.fn()

    throttledStream.subscribe(fn)

    sink.next(1)
    expect(fn).toBeCalled()
    expect(fn.mock.calls[0][0]).toBe(1)

    // ignore subsequent calls if wait period is not finished
    sink.next(2)
    expect(fn.mock.calls.length).toBe(1)

    sink.next(3)
    expect(fn.mock.calls.length).toBe(1)

    jest.runAllTimers()
    expect(fn.mock.calls.length).toBe(1)

    sink.next(4)
    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[1][0]).toBe(4)
  })

  it('passes disposer', () => {
    const [stream, sink] = createSubject()
    const throttledStream = throttle(10)(stream)
    const fn = jest.fn()
    const disposer = throttledStream.subscribe(fn)

    sink.next(2)
    sink.next(4)

    jest.runAllTimers()
    disposer.unsubscribe()

    sink.next(8)
    sink.next(16)

    expect(fn.mock.calls).toEqual([[2]])
  })
})
