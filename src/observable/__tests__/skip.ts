import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { skip as skipOperator } from '../../operators/skip'
import { of } from '../of'
import { skip } from '../skip'
import { createSubject } from '../subject'

describe('(Extra) skip', () => {
  commonTest(skip(2, of(1, 2, 3, 4)), skipOperator(2)(of(1, 2, 3, 4)), [3, 4])

  it('should skip n values', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    skip(2, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).not.toBeCalled()

    sink.next(2)
    expect(observer.next).not.toBeCalled()

    sink.next(3)
    expect(observer.next).toBeCalledWith(3)
  })
})
