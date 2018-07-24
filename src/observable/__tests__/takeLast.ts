import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { takeLast as takeLastOperator } from '../../operators/takeLast'
import { of } from '../of'
import { takeLast } from '../takeLast'
import { throwError } from '../throwError'

describe('(Extra) takeLast', () => {
  commonTest(takeLast(2, of(1, 2, 3, 4)), takeLastOperator(2)(of(1, 2, 3, 4)), [3, 4])

  it('propagates errors from inner stream', () => {
    const observer = getTestObserver()

    takeLast(1, throwError('error')).subscribe(observer)
    expect(observer.error).toBeCalledWith('error')
  })
})
