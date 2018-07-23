import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { debounceTime as debounceTimeOperator } from '../../operators/debounceTime'
import { debounceTime } from '../debounceTime'
import { createSubject } from '../index'
import { of } from '../of'

jest.useFakeTimers()

describe('(Operator) debounceTime', () => {
  commonTest(debounceTime(100, of(1, 2, 3)), debounceTimeOperator(100)(of(1, 2, 3)))

  it('should throttle the source stream', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()
    const throttledStream = debounceTime(100, stream)

    throttledStream.subscribe(observer)

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
})
