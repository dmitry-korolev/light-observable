import { commonTest } from '../../helpers/testHelpers/commonTest'
import { filter as filterOperator } from '../../operators/filter'
import { filter } from '../filter'
import { of } from '../of'

describe('(Extra) filter', () => {
  const fn = (x: number) => x % 2 === 0
  const source = of(1, 2, 3, 4, 5)

  commonTest(filter(fn, source), filterOperator(fn)(source), [2, 4])
})
