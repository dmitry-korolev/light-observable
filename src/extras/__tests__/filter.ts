import { Observable } from '../../Observable'
import { filter } from '../filter'

describe('(Operator) filter', () => {
  it('returns a new Observable', () => {
    expect(filter(() => true)(Observable.of(1))).toBeInstanceOf(Observable)
  })

  it('emits only the input values for which the filtering operation returns truthy', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) => {
      filter((x: number) => x % 2 === 0)(Observable.of(1, 2, 3, 4)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    })

    expect(outputValues).toEqual([2, 4])
  })
})
