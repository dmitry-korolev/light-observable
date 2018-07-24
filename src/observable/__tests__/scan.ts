import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { scan as scanOperator } from '../../operators'
import { of } from '../of'
import { scan } from '../scan'

describe('(Extra) scan', () => {
  commonTest(
    scan((acc, val) => acc + val, 0, of(1, 2, 3)),
    scanOperator((acc: number, val: number) => acc + val, 0)(of(1, 2, 3)),
    [1, 3, 6]
  )

  it('starts with provided initial value', () => {
    const observer = getTestObserver()
    scan((acc, val) => acc + val, 5, of(1, 2, 3)).subscribe(observer)

    expect(observer.next.mock.calls).toEqual([[6], [8], [11]])
  })
})
