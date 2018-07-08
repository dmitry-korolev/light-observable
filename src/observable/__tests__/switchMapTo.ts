import { Observable } from '../../core/Observable'
import { Observer } from '../../core/types.h'
import { switchMapTo } from '../../operators/switchMapTo'
import { switchMapTo as switchMapToObservable } from '../switchMapTo'

jest.useFakeTimers()

const emitAfterTime = <T>(observer: Observer<T>, ms: number, value: T) =>
  setTimeout(() => observer.next(value), ms)

describe('(Operator) switchMap', () => {
  it('returns a new Observable', () => {
    expect(switchMapTo([1])(Observable.of())).toBeInstanceOf(Observable)
  })

  it('should use provided value', async () => {
    const complete = jest.fn()

    const sub = switchMapTo([1, 2])(Observable.of(1, 2, 3)).subscribe({ complete })

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

    const mapped = switchMapTo(mapValue(1))(source)

    mapped.subscribe(sink)

    jest.runTimersToTime(75)

    expect(sink.mock.calls).toEqual([[10]])

    jest.runTimersToTime(50)

    expect(sink.mock.calls).toEqual([[10], [10]])
  })
})

describe('(Observable) switchMap', () => {
  it('returns a new Observable', () => {
    expect(switchMapToObservable([1], Observable.of())).toBeInstanceOf(Observable)
  })

  it('should use provided value', async () => {
    const complete = jest.fn()

    const sub = switchMapToObservable([1, 2], Observable.of(1, 2, 3)).subscribe({ complete })

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

    const mapped = switchMapToObservable(mapValue(1), source)

    mapped.subscribe(sink)

    jest.runTimersToTime(75)

    expect(sink.mock.calls).toEqual([[10]])

    jest.runTimersToTime(50)

    expect(sink.mock.calls).toEqual([[10], [10]])
  })
})
