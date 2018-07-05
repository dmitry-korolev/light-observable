import { of } from '../../observable/of'
import { Observable } from '../Observable'
import { testMethodProperty } from './utils'

describe('(Core) pipe', () => {
  it('is a method of Observable.prototype', () => {
    testMethodProperty(Observable.prototype, 'pipe', {
      configurable: true,
      writable: true,
      length: 0
    })
  })

  it('returns same Observable if no operators provided', () => {
    const o = of(1)
    expect(o.pipe()).toBe(o)
  })
})
