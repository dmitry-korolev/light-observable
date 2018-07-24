import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { completeAfterTime } from '../../helpers/testHelpers/completeAfterTime'
import { emitAfterTime } from '../../helpers/testHelpers/emitAfterTime'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { mergeAll as mergeAllOperator } from '../../operators/mergeAll'
import { mergeAll } from '../mergeAll'
import { of } from '../of'
import { throwError } from '../throwError'

describe('(Extra) mergeAll', () => {
  commonTest(mergeAll(of([1], [2], [3])), mergeAllOperator()(of([1], [2], [3])), [1, 2, 3])

  it('should merge the output of all inner observables', () => {
    const streamA = new Observable((observer1) => {
      emitAfterTime(observer1, 25, 1) // 35
      emitAfterTime(observer1, 50, 2) // 60
      emitAfterTime(observer1, 75, 3) // 85
    })

    const streamB = new Observable((observer1) => {
      emitAfterTime(observer1, 15, 4) // 45
      emitAfterTime(observer1, 30, 5) // 60
      emitAfterTime(observer1, 45, 6) // 75
    })

    const streamC = new Observable((observer1) => {
      emitAfterTime(observer1, 10, streamA)
      emitAfterTime(observer1, 30, streamB)
    })

    const observer = getTestObserver()

    mergeAll(streamC).subscribe(observer)
    expect(observer.next).not.toBeCalled()

    // Source emitted
    jest.runTimersToTime(10)
    expect(observer.next).not.toBeCalled()

    // Source emitted
    jest.runTimersToTime(20)
    expect(observer.next).not.toBeCalled()

    // StreamA emitted
    jest.runTimersToTime(5)
    expect(observer.next).toBeCalledWith(1)

    // StreamB emitted
    jest.runTimersToTime(10)
    expect(observer.next).toBeCalledWith(4)

    // All emits
    jest.runTimersToTime(100)
    expect(observer.next.mock.calls).toEqual([[1], [4], [2], [5], [6], [3]])
  })

  it('should handle FromInput', () => {
    function* emitTwo() {
      yield 5
      yield 6
    }

    const observer = getTestObserver()
    const stream = new Observable((observer1) => {
      observer1.next([1, 2])
      observer1.next(of(3, 4))
      observer1.next(emitTwo())
      observer1.complete()
    })

    mergeAll(stream).subscribe(observer)

    expect(observer.next.mock.calls).toEqual([[1], [2], [3], [4], [5], [6]])
  })

  it('should unsubscribe from inner observables', () => {
    const unsubscribe = jest.fn()
    const inner = new Observable(() => unsubscribe)
    const observer = getTestObserver()

    const subscription = mergeAll(of(inner)).subscribe(observer)

    subscription.unsubscribe()

    expect(unsubscribe).toBeCalled()
  })

  it('should propagate error from the original stream', () => {
    const error: any = throwError('error')
    const observer = getTestObserver()
    mergeAll(error).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })

  it('should propagate error from mapped streams', () => {
    const error = throwError('error')
    const observer = getTestObserver()
    mergeAll<any>(of(error)).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })

  it('should propagate error from subscribing to inner stream', () => {
    const observer = getTestObserver()
    ;(mergeAll as any)(of(1)).subscribe(observer)

    expect(observer.error).toBeCalled()
  })

  it('should not complete until all inner streams completed', () => {
    const observer = getTestObserver()
    const streamA = new Observable(completeAfterTime(25)) // 35
    const streamB = new Observable(completeAfterTime(50)) // 70
    const streamC = new Observable(completeAfterTime(75)) // 105
    const source = new Observable((observer1) => {
      emitAfterTime(observer1, 10, streamA)
      emitAfterTime(observer1, 20, streamB)
      emitAfterTime(observer1, 30, streamC)
      completeAfterTime(observer1, 40)
    })

    mergeAll(source).subscribe(observer)

    // StreamA completed
    jest.runTimersToTime(35) // 35
    expect(observer.complete).not.toBeCalled()

    // Source completed
    jest.runTimersToTime(5) // 40
    expect(observer.complete).not.toBeCalled()

    // StreamB completed
    jest.runTimersToTime(30) // 70
    expect(observer.complete).not.toBeCalled()

    // StreamC completed
    jest.runTimersToTime(35) // 105
    expect(observer.complete).toBeCalled()
  })

  it('should not complete until source stream completes', () => {
    const observer = getTestObserver()
    const streamA = new Observable(completeAfterTime(10)) // 20
    const streamB = new Observable(completeAfterTime(20)) // 40
    const streamC = new Observable(completeAfterTime(30)) // 60
    const source = new Observable((observer1) => {
      emitAfterTime(observer1, 10, streamA)
      emitAfterTime(observer1, 20, streamB)
      emitAfterTime(observer1, 30, streamC)
      completeAfterTime(observer1, 100)
    })

    mergeAll(source).subscribe(observer)

    // StreamA completed
    jest.runTimersToTime(20) // 20
    expect(observer.complete).not.toBeCalled()

    // StreamB completed
    jest.runTimersToTime(20) // 40
    expect(observer.complete).not.toBeCalled()

    // StreamC completed
    jest.runTimersToTime(20) // 60
    expect(observer.complete).not.toBeCalled()

    // source completed
    jest.runTimersToTime(40) // 100
    expect(observer.complete).toBeCalled()
  })
})
