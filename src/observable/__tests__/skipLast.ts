import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { skipLast as skipLastOperator } from '../../operators/skipLast'
import { of } from '../of'
import { skipLast } from '../skipLast'
import { createSubject } from '../subject'
import { throwError } from '../throwError'
import { toArray } from '../toArray'

describe('(Extra) skipLast', () => {
  commonTest(skipLast(2, of(1, 2, 3, 4)), skipLastOperator(2)(of(1, 2, 3, 4)), [1, 2])

  it('should return the same stream if count is less than one', async () => {
    const resultA = await toArray(of(1, 2, 3, 4))
    const resultB = await toArray(skipLast(0, of(1, 2, 3, 4)))

    expect(resultA).toEqual(resultB)
  })

  it('should skipLast n values', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    skipLast(2, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).not.toBeCalled()

    sink.next(2)
    expect(observer.next).not.toBeCalled()

    sink.next(3)
    expect(observer.next).toBeCalledWith(1)

    sink.next(4)
    expect(observer.next).toBeCalledWith(2)
  })

  it('propagates error from source stream', () => {
    const observer = getTestObserver()

    skipLast(2, throwError('error')).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })
})
