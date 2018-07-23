import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { combineLatest as combineLatestCurried } from '../../operators/combineLatest'
import { combineLatest } from '../combineLatest'
import { forEach } from '../forEach'
import { of } from '../of'
import { createSubject } from '../subject'

describe('(Extra) combineLatest', () => {
  commonTest(combineLatest(of(1), of(2)), combineLatestCurried(of(2))(of(1)), [[1, 2]])

  it('combines streams', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const stream = combineLatest(streamA, streamB)
    const observer = getTestObserver()

    stream.subscribe(observer)

    sinkA.next('a1')
    expect(observer.next).not.toBeCalled()

    sinkA.next('a2')
    expect(observer.next).not.toBeCalled()

    sinkB.next('b1')
    expect(observer.next).toBeCalledWith(['a2', 'b1'])

    sinkB.next('b2')
    expect(observer.next).toBeCalledWith(['a2', 'b2'])

    sinkA.next('a3')
    expect(observer.next).toBeCalledWith(['a3', 'b2'])
  })

  it('completes if all source streams completed', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const stream = combineLatest(streamA, streamB)
    const observer = getTestObserver()

    const subscription = stream.subscribe(observer)

    sinkA.next('a1')
    sinkB.next('b1')

    sinkA.complete()
    sinkB.complete()

    sinkA.next('a2')
    sinkB.next('b2')

    expect(observer.next.mock.calls).toEqual([[['a1', 'b1']]])
    expect(observer.complete).toBeCalled()
    expect(subscription.closed).toBe(true)
  })

  it('combines three and more streams', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const [streamC, sinkC] = createSubject()
    const [streamD, sinkD] = createSubject()
    const stream = combineLatest(streamA, streamB, streamC, streamD)

    const observer = getTestObserver()
    stream.subscribe(observer)

    sinkA.next('a1')
    sinkB.next('b1')
    sinkC.next('c1')
    sinkD.next('d1')
    sinkD.next('d2')
    expect(observer.next.mock.calls).toEqual([
      [['a1', 'b1', 'c1', 'd1']],
      [['a1', 'b1', 'c1', 'd2']]
    ])
  })

  it('unsubscribes on unsubscribe', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const stream = combineLatest(streamA, streamB)

    const next = jest.fn()
    const subscription = stream.subscribe(next)

    sinkA.next('a1')
    expect(next).not.toBeCalled()

    sinkA.next('a2')
    expect(next).not.toBeCalled()

    sinkB.next('b1')
    sinkB.next('b2')
    subscription.unsubscribe()

    sinkA.next('a3')
    expect(next.mock.calls).toEqual([[['a2', 'b1']], [['a2', 'b2']]])
  })

  it('should return empty observable if no streams provided', () => {
    const o = combineLatest()
    const observer = getTestObserver()

    o.subscribe(observer)

    expect(observer.next).not.toBeCalled()
    expect(observer.complete).toBeCalled()
  })

  it('should propagate error', () => {
    const ob = combineLatest(of(1), of(2), new Observable<any>((o) => o.error(1)))
    const observer = getTestObserver()

    ob.subscribe(observer)
    expect(observer.next).not.toBeCalled()
    expect(observer.error).toBeCalledWith(1)
  })

  describe('operator', () => {
    it('should place the last applied stream to the first position', async () => {
      const o = combineLatestCurried(of(1), of(2))(of(3))
      const result: any[] = []

      await forEach((x) => result.push(x), o)

      expect(result).toEqual([[3, 1, 2]])
    })
  })
})
