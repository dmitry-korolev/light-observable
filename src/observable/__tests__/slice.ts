import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { slice as sliceOperator } from '../../operators/slice'
import { of } from '../of'
import { slice } from '../slice'
import { createSubject } from '../subject'

describe('(Extra) slice', () => {
  commonTest(slice(1, 3, of(1, 2, 3, 4)), sliceOperator(1, 3)(of(1, 2, 3, 4)), [2, 3])

  it('should slice n values', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    slice(1, 3, stream).subscribe(observer)

    sink.next(1)
    expect(observer.next).not.toBeCalled()

    sink.next(2)
    expect(observer.next).toBeCalledWith(2)

    sink.next(3)
    expect(observer.next).toBeCalledWith(3)
    expect(observer.complete).toBeCalled()
  })
})
