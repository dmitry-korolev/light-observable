import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { mergeMapTo as mergeMapToOperator } from '../../operators/mergeMapTo'
import { mergeMapTo } from '../mergeMapTo'
import { of } from '../of'

describe('(Extra) mergeMapTo', () => {
  commonTest(mergeMapTo([1], of(1, 2, 3)), mergeMapToOperator([1])(of(1, 2, 3)), [1, 1, 1])

  it('should use passed value', () => {
    const value = {}
    const observer = getTestObserver()
    mergeMapTo(of(value), of(1, 2, 3)).subscribe(observer)

    expect(observer.next.mock.calls).toEqual([[value], [value], [value]])
  })
})
