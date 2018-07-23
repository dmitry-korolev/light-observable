import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { take as takeOperator } from '../../operators/take'
import { of } from '../of'
import { createSubject } from '../subject'
import { take } from '../take'

jest.useFakeTimers()

describe('(Extra) take', () => {
  commonTest(take(2, of(1, 2, 3)), takeOperator(2)(of(1, 2, 3)))

  it('should take only n values', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    take(2, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).toBeCalledWith(1)

    sink.next(2)
    expect(observer.next).toBeCalledWith(2)
    expect(observer.complete).toBeCalled()

    sink.next(3)
    expect(observer.next.mock.calls).toHaveLength(2)
  })

  it('returns empty observable if given 0 count', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    take(0, stream).subscribe(observer)
    expect(observer.complete).toBeCalled()
  })
})
