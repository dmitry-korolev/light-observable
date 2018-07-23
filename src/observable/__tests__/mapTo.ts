import { commonTest } from '../../helpers/testHelpers/commonTest'
import { mapTo as mapToOperator } from '../../operators/mapTo'
import { mapTo } from '../mapTo'
import { of } from '../of'

describe('(Extra) map', () => {
  const stream = of(1, 2, 3)

  commonTest(mapTo(1, stream), mapToOperator(1)(stream), [1, 1, 1])
})
