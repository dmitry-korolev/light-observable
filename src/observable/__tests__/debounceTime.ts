import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { debounceTime as debounceTimeOperator } from '../../operators/debounceTime'
import { debounceTime } from '../debounceTime'
import { createSubject } from '../index'
import { of } from '../of'

describe('(Extra) debounceTime', () => {
  commonTest(debounceTime(50, of(1, 2, 3)), debounceTimeOperator(50)(of(1, 2, 3)), [3])

  it('should throttle sink source', () => {
    const observer = getTestObserver()
    debounceTime(50, of(1, 2, 3)).subscribe(observer)

    jest.runTimersToTime(50)
    expect(observer.next.mock.calls).toEqual([[3]])
  })

  it('should throttle the source stream', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()
    debounceTime(100, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).not.toBeCalled()

    sink.next(2)
    expect(observer.next).not.toBeCalled()

    jest.runTimersToTime(50)
    sink.next(3)
    expect(observer.next).not.toBeCalled()

    jest.runTimersToTime(50)
    expect(observer.next).not.toBeCalled()

    jest.runTimersToTime(50)
    expect(observer.next).toBeCalledWith(3)
  })

  it('should complete normally', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()
    debounceTime(100, stream).subscribe(observer)

    sink.complete()
    expect(observer.next).not.toBeCalled()
    expect(observer.complete).toBeCalled()
  })

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler = jest.fn()

    await new Promise((resolve) =>
      debounceTime(100, errorObservable).subscribe({
        error(e) {
          errorHandler(e)
          resolve()
        }
      })
    )

    expect(errorHandler).toHaveBeenCalledWith('error')
  })
})
