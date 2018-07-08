import { Observable } from '../../core/Observable'
import { mapTo } from '../../operators/mapTo'
import { mapTo as mapToObservable } from '../mapTo'

describe('(Operator) map', () => {
  it('returns a new Observable', () => {
    expect(mapTo(1)(Observable.of(1))).toBeInstanceOf(Observable)
  })

  it('emits the provided value on each emit', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) => {
      mapTo(9)(Observable.of(1, 2, 3)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    })

    expect(outputValues).toEqual([9, 9, 9])
  })
})

describe('(Observable) map', () => {
  it('returns a new Observable', () => {
    expect(mapToObservable(1, Observable.of(1))).toBeInstanceOf(Observable)
  })

  it('emits the provided value on each emit', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) => {
      mapToObservable(9, Observable.of(1, 2, 3)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    })

    expect(outputValues).toEqual([9, 9, 9])
  })
})
