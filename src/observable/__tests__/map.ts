import { commonTest } from '../../helpers/testHelpers/commonTest'
import { map as mapOperator } from '../../operators/map'
import { drain } from '../drain'
import { map } from '../map'
import { of } from '../of'

describe('(Extra) map', () => {
  const fn = (x: number) => x * 2
  const stream = of(1, 2, 3)

  commonTest(map(fn, stream), mapOperator(fn)(stream), [2, 4, 6])

  it('should apply mapping fn', async () => {
    const mapFn = jest.fn()

    await drain(map(mapFn, of(1, 2, 3)))

    expect(mapFn.mock.calls).toEqual([[1, 0], [2, 1], [3, 2]])
  })
})
