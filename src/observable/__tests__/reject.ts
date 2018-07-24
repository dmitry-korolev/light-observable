import { commonTest } from '../../helpers/testHelpers/commonTest'
import { reject as rejectOperator } from '../../operators/reject'
import { of } from '../of'
import { reject } from '../reject'

describe('(Extra) reject', () => {
  const fn = (x: number) => x % 2 === 0
  const source = of(1, 2, 3, 4, 5)

  commonTest(reject(fn, source), rejectOperator(fn)(source), [1, 3, 5])
})
