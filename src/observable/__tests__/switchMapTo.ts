import { Observable } from '../../core/Observable'
import { SubscriptionObserver } from '../../core/types.h'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { switchMapTo as switchMapToOperator } from '../../operators/switchMapTo'
import { of } from '../of'
import { switchMapTo } from '../switchMapTo'

const emitAfterTime = <T>(observer: SubscriptionObserver<T>, ms: number, value: T) =>
  setTimeout(() => observer.next(value), ms)

describe('(Extra) switchMapTo', () => {
  commonTest(switchMapTo(of(1, 2), of(3, 4)), switchMapToOperator(of(1, 2))(of(3, 4)), [1, 2, 1, 2])

  it('should use provided value', async () => {
    const complete = jest.fn()

    const sub = switchMapTo([1, 2], Observable.of(1, 2, 3)).subscribe({ complete })

    await null
    expect(sub.closed).toBe(true)
    expect(complete).toHaveBeenCalled()
  })

  it('should emit the latest values of the most recently mapped Observable', () => {
    const sink = jest.fn()

    const source = new Observable((observer) => {
      emitAfterTime(observer, 50, 1)
      emitAfterTime(observer, 100, 50)
      setTimeout(() => observer.complete(), 150)
    })

    const mapValue = (value: any) =>
      new Observable((observer) => {
        observer.next(value * 10)
        emitAfterTime(observer, 100, value * 20)
        setTimeout(() => observer.complete(), 150)
      })

    const mapped = switchMapTo(mapValue(1), source)

    mapped.subscribe(sink)

    jest.runTimersToTime(75)

    expect(sink.mock.calls).toEqual([[10]])

    jest.runTimersToTime(50)

    expect(sink.mock.calls).toEqual([[10], [10]])
  })
})
