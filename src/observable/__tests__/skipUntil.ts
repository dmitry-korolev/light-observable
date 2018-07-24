import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { completeAfterTime } from '../../helpers/testHelpers/completeAfterTime'
import { emitAfterTime } from '../../helpers/testHelpers/emitAfterTime'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { skipUntil as skipUntilOperator } from '../../operators'
import { of } from '../of'
import { skipUntil } from '../skipUntil'
import { throwError } from '../throwError'

describe('(Extra) skipUntil', () => {
  const signal = new Observable(emitAfterTime(20, 'test'))
  const source = new Observable((observer) => {
    emitAfterTime(observer, 15, 1)
    emitAfterTime(observer, 30, 2)
    emitAfterTime(observer, 45, 3)
  })

  commonTest(skipUntil(signal, source), skipUntilOperator(signal)(source), [2, 3])

  it('returns an empty Observable if the signal never emits', async () => {
    const observer = getTestObserver()
    const signalStream = new Observable(completeAfterTime(20))

    skipUntil(signalStream, source).subscribe(observer)

    jest.runTimersToTime(20)
    expect(observer.next).not.toBeCalled()
    expect(observer.complete).toBeCalled()
  })

  it('ignores signal completion if it already emitted', () => {
    const observer = getTestObserver()
    const signalStream = new Observable((observer1) => {
      observer1.next(1)
      observer1.complete()
    })

    skipUntil(signalStream, source).subscribe(observer)

    jest.runTimersToTime(45)
    expect(observer.next.mock.calls).toHaveLength(3)
  })

  it('propagates error from signal stream', () => {
    const observer = getTestObserver()
    const signalStream = throwError('error')

    skipUntil(signalStream, source).subscribe(observer)

    expect(observer.next).not.toBeCalled()
    expect(observer.error).toBeCalledWith('error')
  })

  it('propagates error from signal stream', () => {
    const observer = getTestObserver()
    const sourceStream = throwError('error')

    skipUntil(signal, sourceStream).subscribe(observer)

    expect(observer.next).not.toBeCalled()
    expect(observer.error).toBeCalledWith('error')
  })

  it('emits complete when source stream complete', () => {
    const observer = getTestObserver()
    skipUntil(of(1), of(1, 2, 3)).subscribe(observer)

    expect(observer.next.mock.calls).toEqual([[1], [2], [3]])
    expect(observer.complete).toBeCalled()
  })
})
