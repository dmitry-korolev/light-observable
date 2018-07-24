import { commonTest } from '../../helpers/testHelpers/commonTest'
import { map as mapOperator } from '../../operators/map'
import { map } from '../map'
import { of } from '../of'

describe('(Extra) map', () => {
  const fn = (x: number) => x * 2
  const stream = of(1, 2, 3)

  commonTest(map(fn, stream), mapOperator(fn)(stream), [2, 4, 6])
})
