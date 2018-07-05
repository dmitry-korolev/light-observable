import { Observable } from '../../core/Observable'
import { map } from '../map'

describe('(Operator) map', () => {
  it('returns a new Observable', () => {
    expect(map((x) => x)(Observable.of(1))).toBeInstanceOf(Observable)
  })

  it('emits the result of the operation applied to each input element', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) => {
      map((x: number) => x * 2)(Observable.of(1, 2, 3)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    })

    expect(outputValues).toEqual([2, 4, 6])
  })
})
