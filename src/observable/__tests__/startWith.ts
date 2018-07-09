import { Observable } from '../../core/Observable'
import { startWith } from '../../operators/startWith'

describe('(Operator) startWith', () => {
  it('returns a new Observable', () => {
    expect(startWith([])(Observable.of())).toBeInstanceOf(Observable)
  })

  it('starts with the provided values', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) =>
      startWith([4, 5, 6])(Observable.of(1, 2, 3)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    )

    expect(outputValues).toEqual([4, 5, 6, 1, 2, 3])
  })
})
