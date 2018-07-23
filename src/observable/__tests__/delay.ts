import { Observable } from '../..'
import { Observer } from '../../core/types.h'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { delay as delayOperator } from '../../operators/delay'
import { delay } from '../delay'
import { of } from '../of'

const emitAfterTime = <T>(observer: Observer<T>, ms: number, value: T) =>
  setTimeout(() => observer.next(value), ms)

describe('(Extra) delay', () => {
  commonTest(delay(10, of(1, 2, 3)), delayOperator(10)(of(1, 2, 3)), [1, 2, 3])

  it('delays values by the specified time', () => {
    const observer = getTestObserver()

    delay(100, of(1)).subscribe(observer)

    jest.runTimersToTime(50)
    expect(observer.next).not.toBeCalled()

    jest.runTimersToTime(50)
    expect(observer.next.mock.calls).toEqual([[1]])
    expect(observer.complete).toBeCalled()
  })

  it('preserves event spacing', () => {
    const source = new Observable((o) => {
      o.next(1)
      emitAfterTime(o, 50, 2)
      emitAfterTime(o, 150, 3)
      setTimeout(() => o.complete(), 200)
    })

    const observer = getTestObserver()

    delay(100, source).subscribe(observer)
    jest.runTimersToTime(100)
    expect(observer.next.mock.calls).toEqual([[1]])

    jest.runTimersToTime(50)
    expect(observer.next.mock.calls).toEqual([[1], [2]])

    jest.runTimersToTime(100)
    expect(observer.next.mock.calls).toEqual([[1], [2], [3]])
    expect(observer.complete).not.toBeCalled()

    jest.runTimersToTime(50)
    expect(observer.complete).toBeCalled()
  })

  it('does not emit values after unsubscription', () => {
    const observer = getTestObserver()
    delay(100, of(1))
      .subscribe(observer)
      .unsubscribe()

    jest.runTimersToTime(100)

    expect(observer.next).not.toBeCalled()
  })

  it('propagates errors from the input observable', () => {
    const errorObservable = new Observable((o) => o.error('error'))
    const observer = getTestObserver()

    delay(100, errorObservable).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })

  it('returns same stream if delay value set to 0 or less', () => {
    const observer = getTestObserver()
    delay(0, of(1)).subscribe(observer)
    expect(observer.next).toBeCalledWith(1)
    expect(observer.complete).toBeCalled()
  })
})
