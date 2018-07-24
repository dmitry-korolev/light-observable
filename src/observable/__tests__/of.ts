import { commonTest } from '../../helpers/testHelpers/commonTest'
import { of } from '../of'

describe('(Extra) of', () => {
  commonTest(of(1, 2, 3), undefined, [1, 2, 3])
})
