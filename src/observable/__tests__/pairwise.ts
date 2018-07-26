import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { pairwise as pairwiseOperator } from '../../operators/pairwise'
import { of } from '../of'
import { pairwise } from '../pairwise'

describe('(Extra) pairwise', () => {
  commonTest(pairwise(of(1, 2, 3)), pairwiseOperator()(of(1, 2, 3)), [[1, 2], [2, 3]])

  it('should work with any values', () => {
    const stream = pairwise(of(undefined, null, 0, false))
    const observer = getTestObserver()

    stream.subscribe(observer)

    expect(observer.next.mock.calls).toEqual([
      [[undefined, null]],
      [[null, 0]],
      [[0, false]]
    ])
  })
})
