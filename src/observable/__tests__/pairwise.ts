import { commonTest } from '../../helpers/testHelpers/commonTest'
import { pairwise as pairwiseOperator } from '../../operators'
import { of } from '../of'
import { pairwise } from '../pairwise'

describe('(Extra) pairwise', () => {
  commonTest(pairwise(of(1, 2, 3)), pairwiseOperator()(of(1, 2, 3)), [[1, 2], [2, 3]])
})
