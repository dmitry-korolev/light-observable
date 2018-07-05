import { Observable } from '../Observable'
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
})
