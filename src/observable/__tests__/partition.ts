import { commonTest } from '../../helpers/testHelpers/commonTest'
import { partition as partitionOperator } from '../../operators/partition'
import { of } from '../of'
import { partition } from '../partition'

describe('(Extra) partition', () => {
  const stream = of(1, 2, 3, 4)
  const predicate = (x: number) => x % 2 === 0
  const [f1, r1] = partition(predicate, stream)
  const [f2, r2] = partitionOperator(predicate)(stream)

  commonTest(f1, f2, [2, 4])

  commonTest(r1, r2, [1, 3])
})
