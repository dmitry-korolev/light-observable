import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { sample as sampleOperator } from '../../operators/sample'
import { of } from '../of'
import { sample } from '../sample'
import { createSubject } from '../subject'

jest.useFakeTimers()

describe('(Observable) sample', () => {
  commonTest(sample(of(1), of(2)), sampleOperator(of(1))(of(2)))

  it('should emit on signal emit', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    o.subscribe(observer)

    sinkA.next('a1')
    expect(observer.next).not.toBeCalled()

    sinkA.next('a2')
    expect(observer.next).not.toBeCalled()

    sinkB.next('b1')
    expect(observer.next).not.toBeCalled()

    sinkA.next('a3')
    expect(observer.next.mock.calls).toHaveLength(1)
    expect(observer.next).toBeCalledWith('b1')

    sinkA.next('a4')
    expect(observer.next.mock.calls).toHaveLength(1)
  })

  it('should complete if source completes', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    const sub = o.subscribe(observer)

    sinkB.complete()
    expect(sub.closed).toBe(true)
    expect(observer.complete).toBeCalled()
  })

  it('should complete if notifier completes', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    const sub = o.subscribe(observer)

    sinkA.complete()
    expect(sub.closed).toBe(true)
    expect(observer.complete).toBeCalled()
  })

  it('should propagate error from source', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    const sub = o.subscribe(observer)

    sinkA.error(1)
    expect(sub.closed).toBe(true)
    expect(observer.error).toBeCalledWith(1)
  })

  it('should propagate error from notifier', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    const sub = o.subscribe(observer)

    sinkB.error(1)
    expect(sub.closed).toBe(true)
    expect(observer.error).toBeCalledWith(1)
  })

  it('should unsubscribe', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const o = sample(streamA, streamB)
    const observer = getTestObserver()
    const sub = o.subscribe(observer)

    sinkB.next('b1')
    sinkA.next('a1')
    expect(observer.next.mock.calls).toHaveLength(1)
    expect(observer.next).toBeCalledWith('b1')

    sub.unsubscribe()
    sinkB.next('b2')
    sinkA.next('a2')
    expect(observer.next.mock.calls).toHaveLength(1)
  })
})
