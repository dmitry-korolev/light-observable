import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { skipLast as skipLastOperator } from '../../operators/skipLast'
import { of } from '../of'
import { skipLast } from '../skipLast'
import { createSubject } from '../subject'
import { throwError } from '../throwError'

describe('(Extra) skipLast', () => {
  commonTest(skipLast(2, of(1, 2, 3, 4)), skipLastOperator(2)(of(1, 2, 3, 4)), [1, 2])

  it('should skipLast n values', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    skipLast(2, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).not.toBeCalled()

    sink.next(2)
    expect(observer.next).not.toBeCalled()

    sink.next(3)
    expect(observer.next).not.toBeCalled()

    sink.complete()
    expect(observer.next.mock.calls).toEqual([[1]])
    expect(observer.complete).toBeCalled()
  })

  it('propagates error from source stream', () => {
    const observer = getTestObserver()

    skipLast(2, throwError('error')).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })
})
