import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { completeAfterTime } from '../../helpers/testHelpers/completeAfterTime'
import { emitAfterTime } from '../../helpers/testHelpers/emitAfterTime'
import { errorAfterTime } from '../../helpers/testHelpers/errorAfterTime'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { takeUntil as takeUntilOperator } from '../../operators/takeUntil'
import { takeUntil } from '../takeUntil'

describe('(Extra) takeUntil', () => {
  const signal = new Observable((observer) => {
    emitAfterTime(observer, 50, 1)
  })

  const stream = new Observable((observer) => {
    emitAfterTime(observer, 15, 1)
    emitAfterTime(observer, 30, 2)
    emitAfterTime(observer, 45, 3)
    emitAfterTime(observer, 60, 4)
    emitAfterTime(observer, 75, 5)
  })

  commonTest(takeUntil(signal, stream), takeUntilOperator(signal)(stream), [1, 2, 3])

  it('should propagate error from signal stream', () => {
    const errorSource = new Observable(errorAfterTime(50, 'error'))
    const streamSource = new Observable(emitAfterTime(100, 1))
    const observer = getTestObserver()

    takeUntil(errorSource, streamSource).subscribe(observer)

    jest.runTimersToTime(100)
    expect(observer.next).not.toBeCalled()
    expect(observer.error).toBeCalledWith('error')
  })

  it('should propagate error from source stream', () => {
    const errorSource = new Observable(emitAfterTime(100, 1))
    const streamSource = new Observable(errorAfterTime(50, 'error'))
    const observer = getTestObserver()

    takeUntil(errorSource, streamSource).subscribe(observer)

    jest.runTimersToTime(100)
    expect(observer.next).not.toBeCalled()
    expect(observer.error).toBeCalledWith('error')
  })

  it('should emit all values from stream, if signal completed before emit', () => {
    const signalSource = new Observable(completeAfterTime(100))
    const streamSource = new Observable((observer1) => {
      emitAfterTime(observer1, 50, 1)
      emitAfterTime(observer1, 100, 2)
      emitAfterTime(observer1, 150, 3)
      emitAfterTime(observer1, 200, 4)
    })
    const observer = getTestObserver()

    takeUntil(signalSource, streamSource).subscribe(observer)

    jest.runTimersToTime(200)
    expect(observer.next.mock.calls).toEqual([[1], [2], [3], [4]])
  })
})
