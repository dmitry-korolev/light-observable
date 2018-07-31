import { Observable } from '../Observable'
import { Subscription } from '../types.h'
import { testMethodProperty } from './utils'

describe('(Core) of', () => {
  it('is a method on Observable', () => {
    testMethodProperty(Observable, 'of', {
      configurable: true,
      writable: true,
      length: 0
    })
  })

  it('uses the this value if it is a function', () => {
    let usesThis = false
    // tslint:disable-next-line only-arrow-functions
    Observable.of.call(function() {
      usesThis = true
    })
    expect(usesThis).toBe(true)
  })

  it('uses Observable if the this value is not a function', () => {
    const result = Observable.of.call({}, 1, 2, 3, 4)
    expect(result).toBeInstanceOf(Observable)
  })

  it('delivers arguments', () => {
    const values: number[] = []
    Observable.of(1, 2, 3, 4).subscribe((v) => values.push(v))
    expect(values).toEqual([1, 2, 3, 4])
  })

  it('stops iterating if observer is closed', () => {
    const result: number[] = []
    let subscription: Subscription
    Observable.of(1, 2, 3, 4).subscribe({
      start(s) {
        subscription = s
      },
      next(x) {
        result.push(x)
        if (x === 2) {
          subscription!.unsubscribe()
        }
      }
    })

    expect(result).toEqual([1, 2])
  })
})
