import { Observable } from '../Observable'
import { testMethodProperty } from './utils'

describe('(Core) constructor', () => {
  it('throws if called as a function', () => {
    // @ts-ignore
    // tslint:disable-next-line no-empty
    expect(() => Observable(() => {})).toThrow()

    // tslint:disable-next-line no-empty
    expect(() => Observable.call({}, () => {})).toThrow()
  })

  it('throws if the argument is not callable', () => {
    // @ts-ignore
    expect(() => new Observable({})).toThrow()

    // @ts-ignore
    expect(() => new Observable()).toThrow()

    // @ts-ignore
    expect(() => new Observable(1)).toThrow()

    // @ts-ignore
    expect(() => new Observable('string')).toThrow()
  })

  it('accepts a function argument', () => {
    // tslint:disable-next-line no-empty
    const result = new Observable(() => {})
    expect(result).toBeInstanceOf(Observable)
  })

  it('is the value of Observable.prototype.constructor', () => {
    testMethodProperty(Observable.prototype, 'constructor', {
      configurable: true,
      writable: true,
      length: 1
    })
  })

  it('does not call the subscriber function', () => {
    let called = 0
    // tslint:disable-next-line no-unused-expression
    new Observable(() => {
      called++
    })
    expect(called).toBe(0)
  })
})
