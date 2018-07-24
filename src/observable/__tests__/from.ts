import { commonTest } from '../../helpers/testHelpers/commonTest'
import { from } from '../from'

describe('(Extra) from', () => {
  commonTest(from([1, 2, 3]), undefined, [1, 2, 3])
})
