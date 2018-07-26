import { commonTest } from '../../helpers/testHelpers/commonTest'
import { startWith as startWithOperator } from '../../operators/startWith'
import { of } from '../of'
import { startWith } from '../startWith'

describe('(Extra) startWith', () => {
  commonTest(startWith(of(3, 4), 1, 2), startWithOperator(1, 2)(of(3, 4)), [1, 2, 3, 4])

  it('starts with the provided values', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) =>
      startWith(of(1, 2, 3), 4, 5, 6).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    )

    expect(outputValues).toEqual([4, 5, 6, 1, 2, 3])
  })
})
